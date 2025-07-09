import React from "react";
import { Threat } from "../types";
import { X, Calendar, User, Shield, AlertTriangle } from "lucide-react";

interface ThreatModalProps {
  threat: Threat | null;
  onClose: () => void;
}

export const ThreatModal: React.FC<ThreatModalProps> = ({
  threat,
  onClose,
}) => {
  if (!threat) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-red-400 bg-red-500/20 border-red-500/50";
      case "High":
        return "text-orange-400 bg-orange-500/20 border-orange-500/50";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "Low":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-red-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-red-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Threat Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Threat ID
                </label>
                <p className="text-white font-mono text-lg">{threat.id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category
                </label>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {threat.category}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Severity
                </label>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${getSeverityColor(
                      threat.severity
                    )}`}
                  >
                    {threat.severity}
                  </span>
                  {threat.severityScore && (
                    <span className="text-gray-300">
                      Score: {threat.severityScore}/10
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {threat.source && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Source
                  </label>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{threat.source}</span>
                  </div>
                </div>
              )}

              {threat.timestamp && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Detected
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-white">
                      {formatDate(threat.timestamp)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <p className="text-white bg-gray-700 p-4 rounded-lg">
              {threat.description}
            </p>
          </div>

          {threat.details && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Detailed Analysis
              </label>
              <p className="text-gray-300 bg-gray-700 p-4 rounded-lg leading-relaxed">
                {threat.details}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threat.indicators?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Indicators of Compromise
                </label>
                <div className="bg-gray-700 p-4 rounded-lg space-y-2">
                  {threat.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-white font-mono text-sm">
                        {indicator}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {threat.mitigation && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Mitigation Steps
                </label>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {threat.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
