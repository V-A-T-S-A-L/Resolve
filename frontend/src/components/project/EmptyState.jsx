import React from "react";

export default function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f141b] p-8 text-center">
      <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 ring-1 ring-cyan-400/30 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
