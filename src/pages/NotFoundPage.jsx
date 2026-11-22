// src/pages/NotFoundPage.jsx
// Halaman 404 untuk rute yang tidak dikenal (Atomic Design - Page)
// Mengikuti slide 14

import React from "react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-4xl font-black mb-4 border border-blue-100">
        404
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
        Halaman Tidak Ditemukan
      </h1>

      <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
        Maaf, alamat URL yang Anda tuju tidak terdaftar atau telah dipindahkan.
        Silakan kembali ke halaman utama atau daftar produk.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition shadow-sm"
        >
          <span>&larr;</span>
          <span>Kembali ke Produk</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition"
        >
          <span>Ke Dashboard Utama</span>
        </Link>
      </div>
    </main>
  );
}
