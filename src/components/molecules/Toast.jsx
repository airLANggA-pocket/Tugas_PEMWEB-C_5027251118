// src/components/molecules/Toast.jsx
// Komponen notifikasi mengambang (Atomic Design - Molecule)

import React from "react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-xl border border-slate-800 animate-slide-up"
    >
      <span className="text-emerald-400">✓</span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white cursor-pointer font-bold"
          aria-label="Tutup notifikasi"
        >
          ×
        </button>
      )}
    </div>
  );
}
