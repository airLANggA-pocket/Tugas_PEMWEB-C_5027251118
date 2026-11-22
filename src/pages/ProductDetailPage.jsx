// src/pages/ProductDetailPage.jsx
// Halaman detail satu produk berdasarkan parameter :id URL (Atomic Design - Page)
// Mengikuti slide 7, 13, 25

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import Card from "../components/atoms/Card";
import ProductFormModal from "../components/organisms/ProductFormModal";
import DeleteModal from "../components/organisms/DeleteModal";
import Toast from "../components/molecules/Toast";
import {
  deleteProduct,
  fetchProductById,
  formatRupiah,
  updateProduct,
} from "../services/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const loadProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Produk tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  function showToast(msg) {
    setToastMessage(msg);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToastMessage(""), 2800);
  }

  async function handleSave(updatedData) {
    try {
      const res = await updateProduct(product.id, updatedData);
      setProduct(res.product);
      showToast(res.message);
      setIsEditing(false);
    } catch (err) {
      showToast(err.message);
    }
  }

  async function handleDeleteConfirm() {
    try {
      await deleteProduct(product.id);
      setIsDeleting(false);
      navigate("/products", { replace: true });
    } catch (err) {
      showToast(err.message);
    }
  }

  // Kondisi 1: Sedang memuat data
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-slate-500 font-medium">Memuat detail produk #{id}...</p>
      </div>
    );
  }

  // Kondisi 2: Produk Tidak Ditemukan / Error (Slide 13: if (!product) return <p>Produk tidak ditemukan.</p>)
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto py-10 animate-fade-in">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 text-2xl flex items-center justify-center mx-auto mb-4 font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Produk Tidak Ditemukan
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
            {error || `Data produk dengan ID ${id} tidak terdaftar atau telah dihapus dari sistem.`}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition"
            >
              <span>&larr;</span>
              <span>Kembali ke Daftar Produk</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Kondisi 3: Produk Ditemukan - Tampilkan Detail Lengkap
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Tombol Navigasi Kembali (Ketentuan Fitur 02) */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Kembali ke Daftar Produk</span>
        </Link>
      </div>

      {/* Kartu Informasi Detail */}
      <Card className="p-6 sm:p-8 space-y-6">
        {/* Header Kartu */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Badge variant="blue" className="text-xs px-2.5 py-0.5">
                ID: {product.id}
              </Badge>
              <Badge variant="green">Tersedia di Koperasi</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold uppercase text-slate-400 block mb-0.5">
              Harga Satuan
            </span>
            <span className="text-2xl sm:text-3xl font-black text-blue-600 block">
              {formatRupiah(product.price)}
            </span>
          </div>
        </div>

        {/* Spesifikasi / Rincian Tambahan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-500 block mb-1">Status Ketersediaan</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Siap Dijual
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-500 block mb-1">Kategori Produk</span>
            <span className="text-slate-800 font-medium">Alat Tulis Kantor (ATK)</span>
          </div>
        </div>

        {/* Tombol Aksi: Edit & Hapus */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          >
            &larr; Lihat Semua Produk
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Produk
            </Button>
            <Button
              variant="danger-outline"
              size="sm"
              onClick={() => setIsDeleting(true)}
            >
              Hapus Produk
            </Button>
          </div>
        </div>
      </Card>

      {/* Modals & Toast */}
      {isEditing && (
        <ProductFormModal
          product={product}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}

      {isDeleting && (
        <DeleteModal
          product={product}
          onClose={() => setIsDeleting(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
