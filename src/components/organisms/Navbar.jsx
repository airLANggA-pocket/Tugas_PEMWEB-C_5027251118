// src/components/organisms/Navbar.jsx
// Navigasi aplikasi dengan NavLink dan indikator menu aktif (Atomic Design - Organism)
// Mengikuti slide 10, 12, 21

import React, { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow-xs"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Identitas */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-blue-700 transition">
                P
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 block leading-tight">
                  Koperasi Produk
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Modul 4 · React & Tailwind
                </span>
              </div>
            </Link>
          </div>

          {/* Navigasi Desktop (Slide 21: flex items-center gap-4) */}
          <nav className="hidden md:flex items-center gap-1.5">
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Produk
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              Settings
            </NavLink>
          </nav>

          {/* Quick status badge & mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>API :4000</span>
            </div>

            <button
              type="button"
              onClick={() => setMenuTerbuka(!menuTerbuka)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Buka menu navigasi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuTerbuka ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuTerbuka && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setMenuTerbuka(false)}
              className={mobileNavLinkClass}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuTerbuka(false)}
              className={mobileNavLinkClass}
            >
              Produk
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setMenuTerbuka(false)}
              className={mobileNavLinkClass}
            >
              Settings
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
