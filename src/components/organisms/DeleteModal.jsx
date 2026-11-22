// src/components/organisms/DeleteModal.jsx
// Modal konfirmasi hapus produk (Atomic Design - Organism)

import React, { useEffect } from "react";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import { formatRupiah } from "../../services/api";

export default function DeleteModal({ product, onClose, onConfirm, isDeleting = false }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center">
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

        {/* Warning Icon */}
        <div className="mx-auto w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4">
          🗑
        </div>

        <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-900 mb-1">
          Hapus Produk?
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Tindakan ini permanen. Produk yang dihapus tidak dapat dipulihkan kembali.
        </p>

        {/* Info Produk yang Akan Dihapus */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-5 text-left space-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="blue">ID: {product.id}</Badge>
            <span className="text-xs font-bold text-blue-600">
              {formatRupiah(product.price)}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 line-clamp-1">
            {product.name}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting} className="w-1/2">
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-1/2"
          >
            {isDeleting ? "Menghapus..." : "Hapus Produk"}
          </Button>
        </div>
      </div>
    </div>
  );
}
