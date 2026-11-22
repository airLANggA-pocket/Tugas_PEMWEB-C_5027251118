// src/components/molecules/SearchBar.jsx
// Kolom pencarian produk dengan ikon dan tombol reset (Atomic Design - Molecule)

import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Cari nama produk..." }) {
  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
        aria-label="Cari nama produk"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
          aria-label="Hapus pencarian"
        >
          ✕
        </button>
      )}
    </div>
  );
}
