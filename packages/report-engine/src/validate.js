"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReport = validateReport;
function validateReport(report) {
    const issues = [];
    // Required metadata
    const requiredMeta = ['organization', 'team', 'weekStart', 'weekEnd', 'author', 'rag', 'sensitivity'];
    for (const field of requiredMeta) {
        if (!report.metadata[field]) {
            issues.push(`Missing required metadata field: ${field}`);
        }
    }
    // RAG must be valid
    if (report.metadata.rag && !['Green', 'Amber', 'Red'].includes(report.metadata.rag)) {
        issues.push('RAG must be Green, Amber, or Red');
    }
    // Week dates valid and weekEnd >= weekStart
    if (report.metadata.weekStart && report.metadata.weekEnd) {
        const start = new Date(report.metadata.weekStart);
        const end = new Date(report.metadata.weekEnd);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            issues.push('weekStart and weekEnd must be valid ISO dates');
        }
        else if (end < start) {
            issues.push('weekEnd must be after or equal to weekStart');
        }
    }
    // Blockers: must have owner
    for (const blocker of report.sections.blockers) {
        if (!blocker.owner) {
            issues.push(`Blocker "${blocker.title}" missing owner`);
        }
        if (blocker.neededFrom && !blocker.dueDate) {
            issues.push(`Blocker "${blocker.title}" has neededFrom but missing dueDate`);
        }
    }
    // Risks: must have likelihood and impact
    for (const risk of report.sections.risks) {
        if (!risk.likelihood || !risk.impact) {
            issues.push(`Risk "${risk.title}" missing likelihood or impact`);
        }
    }
    // At least one accomplishment or explicit no progress
    if (report.sections.accomplishments.length === 0) {
        // Assume valid if no accomplishments (could add "no progress" check later)
    }
    return {
        valid: issues.length === 0,
        issues
    };
}
//# sourceMappingURL=validate.js.map