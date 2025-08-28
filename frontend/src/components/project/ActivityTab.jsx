import React from "react";
import { Clock } from "lucide-react";

export default function ActivityTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-violet-400 flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5" /> Recent Activity
      </h2>
      <ul className="space-y-3">
        {["Fixed bug #12", "Added new member", "Updated project settings"].map(
          (activity, idx) => (
            <li
              key={idx}
              className="bg-zinc-800 rounded-xl p-4 shadow-md border border-zinc-700 hover:border-violet-400/40 transition"
            >
              <span className="text-zinc-200">{activity}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
