// src/components/molecules/ProductListItem.jsx
// Tampilan baris list produk untuk opsi List View di Settings (Atomic Design - Molecule)

import React from "react";
import { Link } from "react-router";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { formatRupiah } from "../../services/api";

export default function ProductListItem({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-blue-300 hover:shadow-xs transition">
      <div className="flex items-center gap-3">
        <Badge variant="blue" className="shrink-0">
          ID: {product.id}
        </Badge>
        <div>
          <h3 className="text-base font-semibold text-slate-800">{product.name}</h3>
          <p className="text-sm font-bold text-blue-600 sm:hidden">
            {formatRupiah(product.price)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <span className="hidden sm:inline-block text-base font-bold text-blue-600 min-w-28 text-right">
          {formatRupiah(product.price)}
        </span>

        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.id}`}
            className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition"
          >
            Detail &rarr;
          </Link>
          <Button variant="secondary" size="sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="danger-outline" size="sm" onClick={() => onDelete(product)}>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
