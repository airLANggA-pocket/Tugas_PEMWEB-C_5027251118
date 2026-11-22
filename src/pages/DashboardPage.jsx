// src/pages/DashboardPage.jsx
// Halaman utama Dashboard ringkasan katalog produk (Atomic Design - Page)
// Mengikuti slide 7, 11, 21

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import StatCard from "../components/molecules/StatCard";
import ProductCard from "../components/molecules/ProductCard";
import Button from "../components/atoms/Button";
import ProductFormModal from "../components/organisms/ProductFormModal";
import DeleteModal from "../components/organisms/DeleteModal";
import Toast from "../components/molecules/Toast";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  formatRupiah,
  updateProduct,
} from "../services/api";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formProduct, setFormProduct] = useState(undefined);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  function showToast(msg) {
    setToastMessage(msg);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToastMessage(""), 3000);
  }

  async function handleSave(data) {
    try {
      const isEditing = Boolean(formProduct);
      let res;
      if (isEditing) {
        res = await updateProduct(formProduct.id, data);
        setProducts((prev) =>
          prev.map((item) => (item.id === formProduct.id ? res.product : item))
        );
      } else {
        res = await createProduct(data);
        setProducts((prev) => [...prev, res.product]);
      }
      showToast(res.message);
      setFormProduct(undefined);
    } catch (err) {
      showToast(err.message);
    }
  }

  async function handleDelete() {
    if (!productToDelete) return;
    try {
      const res = await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((item) => item.id !== productToDelete.id));
      showToast(res.message);
      setProductToDelete(null);
    } catch (err) {
      showToast(err.message);
    }
  }

  // Ringkasan metrik statistik
  const totalProducts = products.length;
  const totalValuation = products.reduce((acc, curr) => acc + curr.price, 0);
  const avgPrice = totalProducts > 0 ? Math.round(totalValuation / totalProducts) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner Selamat Datang */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider mb-3">
            Sistem Manajemen Koperasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Kelola Inventaris Produk dengan Mudah
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mb-6 leading-relaxed">
            Aplikasi terintegrasi dengan REST API Node.js/Express, didukung routing navigasi React Router dan antarmuka modern Tailwind CSS.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-blue-700 font-bold text-sm shadow-sm hover:bg-blue-50 transition"
            >
              <span>Lihat Semua Produk</span>
              <span>&rarr;</span>
            </Link>
            <Button
              variant="outline"
              size="md"
              onClick={() => setFormProduct(null)}
              className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20"
            >
              ＋ Tambah Produk Baru
            </Button>
          </div>
        </div>

        {/* Dekorasi Visual Background */}
        <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      </section>

      {/* Grid Statistik Metrik */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          title="Total Produk"
          value={totalProducts}
          subtitle="Item aktif terdaftar di sistem"
          color="blue"
          icon="📦"
        />
        <StatCard
          title="Nilai Inventaris"
          value={formatRupiah(totalValuation)}
          subtitle="Akumulasi seluruh stok barang"
          color="emerald"
          icon="💰"
        />
        <StatCard
          title="Harga Rata-Rata"
          value={formatRupiah(avgPrice)}
          subtitle="Perkiraan harga rata-rata produk"
          color="indigo"
          icon="📊"
        />
      </section>

      {/* Produk Terbaru Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daftar Produk Terbaru</h2>
            <p className="text-xs text-slate-500">Tinjauan cepat produk yang tersimpan di server.</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Buka Katalog Lengkap ({totalProducts}) &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
            Memuat data...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error} (Pastikan backend berjalan pada port 4000)
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
            Belum ada produk. Klik "Tambah Produk Baru" untuk menambahkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onEdit={setFormProduct}
                onDelete={setProductToDelete}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modals & Toast */}
      {formProduct !== undefined && (
        <ProductFormModal
          product={formProduct}
          onClose={() => setFormProduct(undefined)}
          onSave={handleSave}
        />
      )}

      {productToDelete && (
        <DeleteModal
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={handleDelete}
        />
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
