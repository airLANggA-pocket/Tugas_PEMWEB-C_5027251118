// src/layouts/AppLayout.jsx
// Shared layout membungkus seluruh halaman anak lewat <Outlet />
// Mengikuti slide 11 & 12

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/organisms/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-xs py-6 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 Koperasi Produk · Pemrograman Web (Modul 4 · React Router & Tailwind)</p>
          <p className="font-medium text-slate-600">
            Pradipta Airlangga Ramadhan · <span className="font-mono text-slate-500">5027251118</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
