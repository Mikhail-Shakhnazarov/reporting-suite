export interface ReportMetadata {
  organization: string;
  team: string;
  weekStart: string; // ISO date string
  weekEnd: string; // ISO date string
  author: string;
  rag: 'Green' | 'Amber' | 'Red';
  sensitivity: 'Public' | 'Internal' | 'Restricted';
}

export interface Metric {
  name: string;
  value: string | number;
  delta?: string;
  note?: string;
}

export interface Blocker {
  title: string;
  impact: 'Low' | 'Medium' | 'High';
  owner: string;
  neededFrom?: string;
  dueDate?: string;
}

export interface Risk {
  title: string;
  category: string;
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
  owner: string;
}

export interface Decision {
  title: string;
  rationale: string;
  date: string; // ISO date
}

export interface Ask {
  ask: string;
  fromWhom: string;
  byWhen: string; // ISO date
}

export interface ReportSections {
  accomplishments: string[];
  metrics: Metric[];
  blockers: Blocker[];
  risks: Risk[];
  decisions: Decision[];
  nextWeek: string[];
  asks: Ask[];
}

export interface WeeklyReport {
  metadata: ReportMetadata;
  sections: ReportSections;
}

export interface ValidationResult {
  valid: boolean;
  issues: string[];
}

export interface AnchorMapping {
  [key: string]: string; // anchor name -> content
}

export interface RenderPlan {
  anchors: AnchorMapping;
  provenance: {
    schemaVersion: string;
    templateVersion: string;
    generatedAt: string;
  };
}