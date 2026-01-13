import { describe, it, expect } from 'vitest';
import { validateReport } from '../src/validate';
import type { WeeklyReport } from '../src/types';

const validReport: WeeklyReport = {
  metadata: {
    organization: 'Harborlight',
    team: 'Programs',
    weekStart: '2026-01-06',
    weekEnd: '2026-01-12',
    author: 'Alice Chen',
    rag: 'Green',
    sensitivity: 'Internal'
  },
  sections: {
    accomplishments: ['Completed task'],
    metrics: [],
    blockers: [{ title: 'Blocker', impact: 'High', owner: 'Alice' }],
    risks: [{ title: 'Risk', category: 'Test', likelihood: 'Low', impact: 'Low', mitigation: 'Fix', owner: 'Alice' }],
    decisions: [],
    nextWeek: [],
    asks: []
  }
};

describe('validateReport', () => {
  it('validates a correct report', () => {
    const result = validateReport(validReport);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('fails on missing RAG', () => {
    const invalid = { ...validReport, metadata: { ...validReport.metadata, rag: undefined as any } };
    const result = validateReport(invalid);
    expect(result.valid).toBe(false);
    expect(result.issues).toContain('Missing required metadata field: rag');
  });

  it('fails on weekEnd before weekStart', () => {
    const invalid = { ...validReport, metadata: { ...validReport.metadata, weekEnd: '2026-01-05' } };
    const result = validateReport(invalid);
    expect(result.valid).toBe(false);
    expect(result.issues).toContain('weekEnd must be after or equal to weekStart');
  });

  it('fails on blocker without owner', () => {
    const invalid = { ...validReport, sections: { ...validReport.sections, blockers: [{ title: 'Blocker', impact: 'High' }] } };
    const result = validateReport(invalid);
    expect(result.valid).toBe(false);
    expect(result.issues).toContain('Blocker "Blocker" missing owner');
  });
});