import React from "react";
import { ThreatStats } from "../types";
import { AlertTriangle, Shield, Activity } from "lucide-react";

interface StatsSectionProps {
  stats: ThreatStats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const severityMap: Record<string, string> = {
    "1": "Low",
    "2": "Medium",
    "3": "Medium",
    "4": "High",
    "5": "Critical",
  };

  const getSeverityColor = (label: string) => {
    switch (label) {
      case "Critical":
        return "text-red-400";
      case "High":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getSeverityBg = (label: string) => {
    switch (label) {
      case "Critical":
        return "bg-red-500/20";
      case "High":
        return "bg-orange-500/20";
      case "Medium":
        return "bg-yellow-500/20";
      case "Low":
        return "bg-green-500/20";
      default:
        return "bg-gray-500/20";
    }
  };

  const convertedSeverities: Record<string, number> = {};
  Object.entries(stats.severities).forEach(([key, count]) => {
    const label = severityMap[key] || key;
    convertedSeverities[label] = (convertedSeverities[label] || 0) + count;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-900 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Threats</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Incidents</p>
              <p className="text-3xl font-bold text-white">
                {convertedSeverities["Critical"] || 0}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Categories</p>
              <p className="text-3xl font-bold text-white">
                {Object.keys(stats.categories).length}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Activity className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Threats by Category
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-300">{category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 transition-all duration-500"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-medium w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Threats by Severity
          </h3>
          <div className="space-y-3">
            {Object.entries(convertedSeverities).map(
              ([severityLabel, count]) => (
                <div
                  key={severityLabel}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getSeverityBg(
                        severityLabel
                      )}`}
                    />
                    <span className="text-gray-300">{severityLabel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${getSeverityColor(
                          severityLabel
                        ).replace("text-", "bg-")}`}
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-medium w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
