import React from "react";
import { Settings } from "lucide-react";

export default function SettingsTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5" /> Project Settings
      </h2>

      <div className="space-y-6">
        <div className="bg-zinc-800 p-6 rounded-2xl shadow-md">
          <label className="block text-sm text-zinc-400 mb-2">
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter name..."
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="bg-zinc-800 p-6 rounded-2xl shadow-md">
          <label className="block text-sm text-zinc-400 mb-2">Description</label>
          <textarea
            placeholder="Enter description..."
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <button className="px-5 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
