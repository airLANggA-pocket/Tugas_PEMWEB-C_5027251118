// src/components/atoms/Card.jsx
// Komponen wadah kartu umum (Atomic Design - Atom)

import React from "react";

export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 transition duration-150 ${className}`}
    >
      {children}
    </div>
  );
}
