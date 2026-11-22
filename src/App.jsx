// src/App.jsx
// Pemetaan rute URL ke komponen halaman menggunakan React Router
// Mengikuti slide 9, 11, 14

import React from "react";
import { Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      {/* Rute Berkelompok dengan Shared Layout (Slide 11 & 12) */}
      <Route path="/" element={<AppLayout />}>
        {/* Halaman Dashboard Utama (Slide 11: index route) */}
        <Route index element={<DashboardPage />} />

        {/* Halaman Daftar & Manajemen Produk (Slide 11: path products) */}
        <Route path="products" element={<ProductsPage />} />

        {/* Halaman Detail Produk dengan Parameter :id (Slide 13: path products/:id) */}
        <Route path="products/:id" element={<ProductDetailPage />} />

        {/* Halaman Pengaturan & Toggle View Grid/List (Slide 11: path settings) */}
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Rute 404 Wildcard untuk URL yang tidak terdaftar (Slide 14) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
