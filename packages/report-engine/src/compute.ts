import { WeeklyReport } from './types';

export function computeWeekLabel(report: WeeklyReport): string {
  return `${report.metadata.weekStart} to ${report.metadata.weekEnd}`;
}

export function computeSummary(report: WeeklyReport): string {
  const team = report.metadata.team;
  const accomplishments = report.sections.accomplishments.length;
  const blockers = report.sections.blockers.length;
  const rag = report.metadata.rag;

  return `${team} team: ${accomplishments} accomplishments, ${blockers} blockers, status ${rag}.`;
}

// Add more compute functions as needed