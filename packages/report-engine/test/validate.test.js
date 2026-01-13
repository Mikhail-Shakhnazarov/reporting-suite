"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validate_1 = require("../src/validate");
const validReport = {
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
(0, vitest_1.describe)('validateReport', () => {
    (0, vitest_1.it)('validates a correct report', () => {
        const result = (0, validate_1.validateReport)(validReport);
        (0, vitest_1.expect)(result.valid).toBe(true);
        (0, vitest_1.expect)(result.issues).toHaveLength(0);
    });
    (0, vitest_1.it)('fails on missing RAG', () => {
        const invalid = { ...validReport, metadata: { ...validReport.metadata, rag: undefined } };
        const result = (0, validate_1.validateReport)(invalid);
        (0, vitest_1.expect)(result.valid).toBe(false);
        (0, vitest_1.expect)(result.issues).toContain('Missing required metadata field: rag');
    });
    (0, vitest_1.it)('fails on weekEnd before weekStart', () => {
        const invalid = { ...validReport, metadata: { ...validReport.metadata, weekEnd: '2026-01-05' } };
        const result = (0, validate_1.validateReport)(invalid);
        (0, vitest_1.expect)(result.valid).toBe(false);
        (0, vitest_1.expect)(result.issues).toContain('weekEnd must be after or equal to weekStart');
    });
    (0, vitest_1.it)('fails on blocker without owner', () => {
        const invalid = { ...validReport, sections: { ...validReport.sections, blockers: [{ title: 'Blocker', impact: 'High' }] } };
        const result = (0, validate_1.validateReport)(invalid);
        (0, vitest_1.expect)(result.valid).toBe(false);
        (0, vitest_1.expect)(result.issues).toContain('Blocker "Blocker" missing owner');
    });
});
//# sourceMappingURL=validate.test.js.map