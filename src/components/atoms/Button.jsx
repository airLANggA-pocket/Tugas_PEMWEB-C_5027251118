// src/components/atoms/Button.jsx
// Komponen tombol reusable dengan berbagai varian styling (Atomic Design - Atom)
// Mengikuti contoh slide 23

import React from "react";

const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500",
  secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500",
  "danger-outline": "bg-white text-red-600 border border-red-300 hover:bg-red-50 focus:ring-red-400",
  outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
};

const sizes = {
  sm: "px-2.5 py-1.5 text-xs font-medium rounded-md gap-1.5",
  md: "px-4 py-2 text-sm font-medium rounded-lg gap-2",
  lg: "px-5 py-2.5 text-base font-medium rounded-lg gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const variantClass = styles[variant] || styles.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
