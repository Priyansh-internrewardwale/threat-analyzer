import React from "react";
import { Shield, Bell, Settings, TerminalSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();

  const isAnalyzePage = location.pathname === "/analyze";

  return (
    <header className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Threat Intelligence Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={isAnalyzePage ? "/" : "/analyze"}
              className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <TerminalSquare className="h-4 w-4 mr-2" />
              {isAnalyzePage ? "Back to Dashboard" : "Threat Analyzer"}
            </Link>
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
