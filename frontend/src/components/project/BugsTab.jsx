import React from "react";
import { Bug, Plus } from "lucide-react";

export default function BugsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
          <Bug className="h-5 w-5" /> Reported Bugs
        </h2>
        <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Bug
        </button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((bug) => (
          <div
            key={bug}
            className="bg-zinc-800 rounded-xl p-4 shadow-md border border-zinc-700 hover:border-emerald-400/40 transition"
          >
            <h3 className="font-medium text-cyan-400">
              Bug #{bug}: Unexpected crash on save
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Steps: Open editor → Save → App crashes.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
