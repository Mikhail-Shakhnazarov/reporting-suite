"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRenderPlan = generateRenderPlan;
const compute_1 = require("./compute");
function generateRenderPlan(report) {
    const anchors = {
        META: `**Week:** ${(0, compute_1.computeWeekLabel)(report)}\n**Team:** ${report.metadata.team}\n**Author:** ${report.metadata.author}\n**RAG:** ${report.metadata.rag}`,
        SUMMARY: (0, compute_1.computeSummary)(report),
        ACCOMPLISHMENTS: report.sections.accomplishments.map(acc => `- ${acc}`).join('\n'),
        METRICS: report.sections.metrics.map(m => `| ${m.name} | ${m.value} | ${m.delta || ''} | ${m.note || ''} |`).join('\n'),
        BLOCKERS: report.sections.blockers.map(b => `**${b.title}** (${b.impact})\n- Owner: ${b.owner}\n- Needed from: ${b.neededFrom || 'N/A'}\n- Due: ${b.dueDate || 'N/A'}`).join('\n\n'),
        RISKS: report.sections.risks.map(r => `**${r.title}** (${r.category})\n- Likelihood: ${r.likelihood}, Impact: ${r.impact}\n- Mitigation: ${r.mitigation}\n- Owner: ${r.owner}`).join('\n\n'),
        DECISIONS: report.sections.decisions.map(d => `**${d.title}**\n- Rationale: ${d.rationale}\n- Date: ${d.date}`).join('\n\n'),
        NEXT_WEEK: report.sections.nextWeek.map(n => `- ${n}`).join('\n'),
        ASKS: report.sections.asks.map(a => `**${a.ask}**\n- From: ${a.fromWhom}\n- By: ${a.byWhen}`).join('\n\n'),
        PROVENANCE: `Generated on ${new Date().toISOString()}\nSchema v1.0`,
        MANUAL_NOTES: '[Add manual notes here]'
    };
    return {
        anchors,
        provenance: {
            schemaVersion: '1.0',
            templateVersion: '1.0',
            generatedAt: new Date().toISOString()
        }
    };
}
//# sourceMappingURL=renderPlan.js.map