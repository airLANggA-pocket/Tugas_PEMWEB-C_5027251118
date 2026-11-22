// src/pages/SettingsPage.jsx
// Halaman pengaturan tampilan dan preferensi sistem (Atomic Design - Page)
// Mengikuti slide 7, 11, 25

import React, { useState } from "react";
import Card from "../components/atoms/Card";
import Button from "../components/atoms/Button";
import Toast from "../components/molecules/Toast";
import { BASE_URL } from "../services/api";

export default function SettingsPage() {
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("preferred_view_mode") || "grid";
  });
  const [toastMessage, setToastMessage] = useState("");

  function handleChangeView(mode) {
    setViewMode(mode);
    localStorage.setItem("preferred_view_mode", mode);
    setToastMessage(`Tampilan default diubah ke ${mode.toUpperCase()} view.`);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Aplikasi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sesuaikan preferensi tampilan dan periksa koneksi service backend.
        </p>
      </div>

      {/* Preferensi Tampilan (Slide 25: perubahan grid/list dari Settings) */}
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Tata Letak Produk Default</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih bagaimana produk ditampilkan pada halaman utama daftar produk.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleChangeView("grid")}
            className={`p-4 rounded-xl border text-left cursor-pointer transition ${
              viewMode === "grid"
                ? "border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
            }`}
          >
            <div className="text-xl mb-1">⊞</div>
            <p className="text-sm font-bold">Grid View</p>
            <p className="text-xs text-slate-500 mt-0.5">
              3 kolom responsif dalam bentuk kartu.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleChangeView("list")}
            className={`p-4 rounded-xl border text-left cursor-pointer transition ${
              viewMode === "list"
                ? "border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
            }`}
          >
            <div className="text-xl mb-1">☰</div>
            <p className="text-sm font-bold">List View</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Baris daftar horizontal memanjang ke bawah.
            </p>
          </button>
        </div>
      </Card>

      {/* Konfigurasi Backend & Server */}
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Koneksi Backend Service</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Alamat endpoint REST API backend yang aktif digunakan oleh frontend.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-600">Base URL</span>
            <code className="font-mono text-blue-600 font-bold">{BASE_URL}</code>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-600">Endpoint Produk</span>
            <code className="font-mono text-slate-700">{BASE_URL}/api/products</code>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-600">Pemeriksaan Server (Health)</span>
            <code className="font-mono text-slate-700">{BASE_URL}/health</code>
          </div>
        </div>
      </Card>

      {/* Informasi Mahasiswa & Proyek */}
      <Card className="p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900">Informasi Tugas & Pengembang</h2>
        <div className="text-xs space-y-1.5 text-slate-600">
          <p><span className="font-semibold text-slate-700">Nama:</span> Pradipta Airlangga Ramadhan</p>
          <p><span className="font-semibold text-slate-700">NIM:</span> 5027251118</p>
          <p><span className="font-semibold text-slate-700">Mata Kuliah:</span> Pemrograman Web (Kelas C)</p>
          <p><span className="font-semibold text-slate-700">Modul:</span> Modul 4 - React Router & Tailwind CSS (Pertemuan 13)</p>
        </div>
      </Card>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
