// Defines TypeScript interfaces for threat data and API responses.
export interface Threat {
  id: string;
  description: string;
  category: string;
  severity: string; 
  severityScore: number;
  source: string;
  timestamp: string;
  details: string;
  indicators: string[];
  mitigation: string;
}

export interface ThreatStats {
  total: number;
  categories: Record<string, number>;
  severities: Record<string, number>;
}
