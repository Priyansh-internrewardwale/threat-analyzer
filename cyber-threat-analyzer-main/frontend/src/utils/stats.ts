// Contains helper function to fetch threat statistics from the backend.
import { Threat, ThreatStats } from '../types';
export function generateThreatStats(threats: Threat[]): ThreatStats {
  const stats: ThreatStats = {
    total: threats.length,
    categories: {},
    severities: {}
  };

  threats.forEach((threat) => {
    const category = String(threat.category || 'Unknown');
    const severity = String(threat.severity || 'Unrated');

    stats.categories[category] = (stats.categories[category] || 0) + 1;
    stats.severities[severity] = (stats.severities[severity] || 0) + 1;
  });

  return stats;
}


