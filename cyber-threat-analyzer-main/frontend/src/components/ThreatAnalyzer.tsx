import React, { useState } from "react";
export const ThreatAnalyzer: React.FC = () => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.predicted_category);
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-red-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          {" "}
          Real-Time Threat Analysis
        </h2>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a suspicious threat description..."
        ></textarea>

        <button
          onClick={handleAnalyze}
          disabled={loading || description.trim() === ""}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-400 text-sm mb-1">Predicted Category:</p>
            <p className="text-white text-lg font-semibold">{result}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-700 p-4 rounded-lg border-l-4 border-red-500 text-white">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
