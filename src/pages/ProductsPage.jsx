// src/pages/ProductsPage.jsx
// Halaman pengelolaan produk CRUD (Atomic Design - Page)
// Mengikuti slide 7, 11, 21, 22, 23

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/atoms/Button";
import SearchBar from "../components/molecules/SearchBar";
import ProductGrid from "../components/organisms/ProductGrid";
import ProductFormModal from "../components/organisms/ProductFormModal";
import DeleteModal from "../components/organisms/DeleteModal";
import Toast from "../components/molecules/Toast";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formProduct, setFormProduct] = useState(undefined); // null = tambah, object = edit, undefined = tutup
  const [productToDelete, setProductToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Mode Tampilan: default dari localStorage (Slide 25)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("preferred_view_mode") || "grid";
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setServerError("");
    } catch (err) {
      setServerError(err.message || "Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function showToast(msg) {
    setToastMessage(msg);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToastMessage(""), 2800);
  }

  function handleToggleViewMode(mode) {
    setViewMode(mode);
    localStorage.setItem("preferred_view_mode", mode);
  }

  // Filter pencarian di client
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((item) => item.name.toLowerCase().includes(q));
  }, [products, searchQuery]);

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
      setServerError("");
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
      setServerError("");
      showToast(res.message);
      setProductToDelete(null);
    } catch (err) {
      showToast(err.message);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data produk, harga, dan ketersediaan barang melalui REST API backend.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setFormProduct(null)}
          className="shadow-sm self-start sm:self-auto"
        >
          <span className="text-lg leading-none mr-1">＋</span>
          <span>Tambah Produk</span>
        </Button>
      </div>

      {/* Bar Pencarian & Switcher Grid / List */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari nama produk..."
        />

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500">
            {filteredProducts.length} dari {products.length} produk
          </span>

          {/* Toggle Grid / List (Slide 25) */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
            <button
              type="button"
              onClick={() => handleToggleViewMode("grid")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Tampilan Grid"
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => handleToggleViewMode("list")}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Tampilan List"
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Daftar Produk */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={serverError}
        searchQuery={searchQuery}
        viewMode={viewMode}
        onRetry={loadProducts}
        onEdit={(p) => setFormProduct(p)}
        onDelete={(p) => setProductToDelete(p)}
        onOpenCreate={() => setFormProduct(null)}
      />

      {/* Modals Form & Delete */}
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
