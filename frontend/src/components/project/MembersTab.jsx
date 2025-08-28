import React from "react";
import { Users, UserPlus } from "lucide-react";

export default function MembersTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
          <Users className="h-5 w-5" /> Project Members
        </h2>
        <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition flex items-center gap-2">
          <UserPlus className="h-4 w-4" /> Invite Member
        </button>
      </div>

      <ul className="space-y-3">
        {["Alice", "Bob", "Charlie"].map((member) => (
          <li
            key={member}
            className="bg-zinc-800 rounded-xl p-4 shadow-md border border-zinc-700 hover:border-cyan-400/40 transition"
          >
            <span className="text-zinc-200">{member}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
