import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { StatsSection } from "./components/StatsSection";
import { ThreatTable } from "./components/ThreatTable";
import { ThreatModal } from "./components/ThreatModal";
import { ThreatAnalyzer } from "./components/ThreatAnalyzer";
import { Threat, ThreatStats } from "./types";
import { generateThreatStats } from "./utils/stats";

function Dashboard() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [stats, setStats] = useState<ThreatStats>({
    total: 0,
    categories: {},
    severities: {},
  });
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:5000/api/threats?page=1&limit=100"
        );
        const json = await res.json();
        const data = json.data;
        setThreats(data);
        setStats(generateThreatStats(data));
      } catch (error) {
        console.error("Error fetching threats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewThreat = (threat: Threat) => setSelectedThreat(threat);
  const handleCloseModal = () => setSelectedThreat(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading threat intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <StatsSection stats={stats} />
      <ThreatTable threats={threats} onViewThreat={handleViewThreat} />
      <ThreatModal threat={selectedThreat} onClose={handleCloseModal} />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analyze" element={<ThreatAnalyzer />} />
    </Routes>
  );
}

export default App;
