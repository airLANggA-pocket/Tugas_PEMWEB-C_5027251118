// src/components/molecules/ProductCard.jsx
// Kartu produk sesuai slide 13, 19, 21, 23 (Atomic Design - Molecule)

import React from "react";
import { Link } from "react-router";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import { formatRupiah } from "../../services/api";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card className="flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="blue">ID: {product.id}</Badge>
          <span className="text-xs text-slate-400">Tersedia</span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 line-clamp-2 mb-1" title={product.name}>
          {product.name}
        </h3>

        <p className="text-xl font-extrabold text-blue-600 mb-4">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline gap-1 py-1"
        >
          <span>Detail</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(product)}
            title="Edit produk"
          >
            Edit
          </Button>
          <Button
            variant="danger-outline"
            size="sm"
            onClick={() => onDelete(product)}
            title="Hapus produk"
          >
            Hapus
          </Button>
        </div>
      </div>
    </Card>
  );
}
