// src/components/organisms/ProductFormModal.jsx
// Modal tambah & edit produk dengan validasi form (Atomic Design - Organism)

import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function ProductFormModal({ product, onClose, onSave, isSubmitting = false }) {
  const isEditing = Boolean(product);
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price !== undefined ? String(product.price) : "");
  const [errorName, setErrorName] = useState("");
  const [errorPrice, setErrorPrice] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const cleanName = name.trim();
    const numPrice = Number(price);

    let errName = "";
    let errPrice = "";

    if (!cleanName) {
      errName = "Nama produk wajib diisi.";
    }

    if (!price.trim() || !Number.isFinite(numPrice) || numPrice <= 0) {
      errPrice = "Harga harus berupa angka lebih dari 0.";
    } else if (!Number.isSafeInteger(numPrice)) {
      errPrice = "Harga harus berupa bilangan bulat tanpa desimal.";
    }

    setErrorName(errName);
    setErrorPrice(errPrice);

    if (!errName && !errPrice) {
      onSave({ name: cleanName, price: numPrice });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition"
          aria-label="Tutup modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Modal */}
        <div className="mb-5">
          <h2 id="form-modal-title" className="text-xl font-bold text-slate-900">
            {isEditing ? "Edit Informasi Produk" : "Tambah Produk Baru"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isEditing
              ? `Perbarui informasi untuk produk dengan ID #${product.id}.`
              : "Masukkan nama dan harga produk untuk menyimpannya ke database."}
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            id="form-product-name"
            label="Nama Produk"
            required
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorName) setErrorName("");
            }}
            placeholder="Contoh: Buku Tulis Kotak"
            error={errorName}
            maxLength={60}
          />

          <Input
            id="form-product-price"
            label="Harga (Rp)"
            type="number"
            min="1"
            step="1"
            required
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errorPrice) setErrorPrice("");
            }}
            placeholder="Contoh: 15000"
            error={errorPrice}
            helperText="Masukkan angka nominal harga dalam Rupiah."
          />

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Menyimpan..."
                : isEditing
                ? "Simpan Perubahan"
                : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
