// src/components/organisms/ProductGrid.jsx
// Wadah tampilan daftar produk responsif dengan opsi Grid & List (Atomic Design - Organism)
// Mengikuti slide 21, 22

import React from "react";
import Button from "../atoms/Button";
import ProductCard from "../molecules/ProductCard";
import ProductListItem from "../molecules/ProductListItem";

export default function ProductGrid({
  products = [],
  loading = false,
  error = "",
  searchQuery = "",
  viewMode = "grid",
  onRetry,
  onEdit,
  onDelete,
  onOpenCreate,
}) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-500 text-3xl mb-2">⚠</div>
        <h4 className="text-base font-bold text-red-800 mb-1">Gagal Menghubungkan ke Server</h4>
        <p className="text-sm text-red-600 mb-4 max-w-md mx-auto">
          {error}. Pastikan backend Express berjalan pada <code className="font-mono bg-red-100 px-1 py-0.5 rounded">http://localhost:4000</code>.
        </p>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            Coba Lagi
          </Button>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-16 bg-slate-200 rounded"></div>
              <div className="h-4 w-12 bg-slate-100 rounded"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-8 w-1/2 bg-blue-100 rounded"></div>
            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <div className="h-6 w-14 bg-slate-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-slate-200 rounded"></div>
                <div className="h-6 w-12 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
        <div className="text-slate-400 text-4xl mb-3">📦</div>
        <h4 className="text-base font-semibold text-slate-800 mb-1">
          {searchQuery ? `Tidak ada produk yang cocok dengan "${searchQuery}"` : "Belum ada produk"}
        </h4>
        <p className="text-sm text-slate-500 mb-4 max-w-sm mx-auto">
          {searchQuery
            ? "Coba gunakan kata kunci lain untuk mencari produk yang diinginkan."
            : "Mulai tambahkan produk baru ke dalam katalog sekarang."}
        </p>
        {!searchQuery && onOpenCreate && (
          <Button variant="primary" size="sm" onClick={onOpenCreate}>
            ＋ Tambah Produk Pertama
          </Button>
        )}
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  // Default Grid View (Slide 22: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6)
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
