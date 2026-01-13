/**
 * HTML Template Renderer
 *
 * Renders a RenderPlan into HTML using a simple template system.
 * Adapted from invoice-suite for report rendering.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { RenderPlan } from '@report-suite/engine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template path relative to compiled output
const TEMPLATE_PATH = join(__dirname, '..', '..', 'templates', 'report.html');

/**
 * Load the HTML template from disk.
 */
export function loadTemplate(): string {
  return readFileSync(TEMPLATE_PATH, 'utf-8');
}

/**
 * Simple template engine supporting {{variable}} substitutions.
 */
export function renderTemplate(template: string, plan: RenderPlan): string {
  let result = template;

  // Map anchor keys to template variables
  const mappings: Record<string, string> = {
    organization: 'Harborlight', // hardcoded for now
    team: 'Team Name', // extract from plan if available
    meta: plan.anchors.META || '',
    summary: plan.anchors.SUMMARY || '',
    accomplishments: plan.anchors.ACCOMPLISHMENTS || '',
    metrics: plan.anchors.METRICS || '',
    blockers: plan.anchors.BLOCKERS || '',
    risks: plan.anchors.RISKS || '',
    decisions: plan.anchors.DECISIONS || '',
    nextWeek: plan.anchors.NEXT_WEEK || '',
    asks: plan.anchors.ASKS || '',
    manualNotes: plan.anchors.MANUAL_NOTES || '',
    provenance: plan.anchors.PROVENANCE || ''
  };

  // Replace {{variable}} with values
  for (const [key, value] of Object.entries(mappings)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    result = result.replace(regex, value);
  }

  // Remove conditional blocks for empty sections
  result = result.replace(/\{\{#if\s+\w+\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, content) => {
    // Check if content has actual values
    const hasContent = content.trim().length > 0 && !content.includes('{{') && !content.includes('}}');
    return hasContent ? content : '';
  });

  return result;
}

/**
 * Render a RenderPlan to HTML.
 */
export function renderReportHtml(plan: RenderPlan): string {
  const template = loadTemplate();
  return renderTemplate(template, plan);
}