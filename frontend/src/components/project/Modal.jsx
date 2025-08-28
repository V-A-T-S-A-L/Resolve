import React from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 rounded-2xl border border-white/10 bg-[#0f141b] p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="text-sm text-gray-200">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}