import React from "react";

export default function OverviewTab() {
  return (
    <div className="grid gap-6">
      <div className="bg-zinc-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-cyan-400">Project Summary</h2>
        <p className="text-zinc-400 mt-2">
          Welcome to your project dashboard. Here you can manage bugs, members,
          activity and settings — all in one sleek workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-800 rounded-2xl p-4 shadow-md">
          <h3 className="text-emerald-400 font-semibold">Open Bugs</h3>
          <p className="text-zinc-400 text-sm mt-2">12 reported</p>
        </div>
        <div className="bg-zinc-800 rounded-2xl p-4 shadow-md">
          <h3 className="text-cyan-400 font-semibold">Members</h3>
          <p className="text-zinc-400 text-sm mt-2">5 collaborators</p>
        </div>
        <div className="bg-zinc-800 rounded-2xl p-4 shadow-md">
          <h3 className="text-violet-400 font-semibold">Activity</h3>
          <p className="text-zinc-400 text-sm mt-2">Latest commits logged</p>
        </div>
      </div>
    </div>
  );
}
