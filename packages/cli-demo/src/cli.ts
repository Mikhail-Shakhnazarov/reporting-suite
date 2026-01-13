#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { validateReport, generateRenderPlan, WeeklyReport, ValidationResult } from '../../report-engine/src/index';
import { renderReportHtml } from './render/htmlTemplate';
import { generatePdf } from './render/pdf';

function loadReport(filePath: string): WeeklyReport {
  const data = readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed[0] : parsed;
}

function loadTemplate(templatePath: string): string {
  return readFileSync(templatePath, 'utf-8');
}

function renderMarkdown(template: string, plan: any): string {
  let output = template;
  for (const [anchor, content] of Object.entries(plan.anchors)) {
    output = output.replace(new RegExp(`\\{${anchor}\\}`, 'g'), content as string);
  }
  return output;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: report-cli <input.json> <template.md> [--pdf output.pdf]');
    process.exit(1);
  }

  let inputPath = '';
  let templatePath = '';
  let pdfPath = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--pdf' && i + 1 < args.length) {
      pdfPath = args[i + 1];
      i++; // skip next
    } else if (!inputPath) {
      inputPath = args[i];
    } else if (!templatePath) {
      templatePath = args[i];
    }
  }

  if (!inputPath) {
    console.error('Error: Input JSON file required');
    process.exit(1);
  }

  try {
    const report = loadReport(inputPath);
    const validation = validateReport(report);

    if (!validation.valid) {
      console.error('Validation failed:');
      validation.issues.forEach((issue: string) => console.error(`- ${issue}`));
      process.exit(1);
    }

    const plan = generateRenderPlan(report);

    if (templatePath) {
      // Markdown output
      const template = loadTemplate(templatePath);
      const markdownOutput = renderMarkdown(template, plan);
      console.log(markdownOutput);
    }

    if (pdfPath) {
      // PDF output
      const html = renderReportHtml(plan);
      const pdfBuffer = await generatePdf(html);
      writeFileSync(pdfPath, pdfBuffer);
      console.error(`PDF saved to ${pdfPath}`);
    }

    if (!templatePath && !pdfPath) {
      console.error('Error: Must specify --pdf or template for output');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}