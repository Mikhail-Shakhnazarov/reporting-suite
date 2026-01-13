"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeWeekLabel = computeWeekLabel;
exports.computeSummary = computeSummary;
function computeWeekLabel(report) {
    return `${report.metadata.weekStart} to ${report.metadata.weekEnd}`;
}
function computeSummary(report) {
    const team = report.metadata.team;
    const accomplishments = report.sections.accomplishments.length;
    const blockers = report.sections.blockers.length;
    const rag = report.metadata.rag;
    return `${team} team: ${accomplishments} accomplishments, ${blockers} blockers, status ${rag}.`;
}
// Add more compute functions as needed
//# sourceMappingURL=compute.js.map