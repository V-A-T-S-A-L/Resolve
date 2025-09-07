import React from "react";
import { Bug, Settings, LayoutDashboard, Users, Activity, MessageSquareCode } from "lucide-react";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  const icons = {
    overview: <LayoutDashboard size={18} />,
    bugs: <Bug size={18} />,
    devlogs : <MessageSquareCode size={18}/>,
    members: <Users size={18} />,
    activity: <Activity size={18} />,
    settings: <Settings size={18} />,
  };

  return (
    <div
      className="
        flex overflow-x-auto md:overflow-visible 
        border-b border-zinc-800 px-2 sm:px-4 md:px-6 
        bg-zinc-900/40 backdrop-blur-sm
        scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent
      "
    >
      <div className="flex space-x-4 sm:space-x-6 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-all duration-300 relative whitespace-nowrap
              ${
                activeTab === tab.id
                  ? "text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]"
                  : "text-zinc-400 hover:text-blue-400 hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.7)]"
              }`}
          >
            {icons[tab.id]}
            <span className="hidden sm:inline">{tab.label}</span>
            {/* underline glow */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
