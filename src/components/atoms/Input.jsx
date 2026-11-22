// src/components/atoms/Input.jsx
// Komponen form input dengan label & pesan validasi (Atomic Design - Atom)

import React from "react";

export default function Input({
  id,
  label,
  error,
  helperText,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoFocus = false,
  className = "",
  min,
  step,
  maxLength,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        min={min}
        step={step}
        maxLength={maxLength}
        className={`w-full px-3.5 py-2 rounded-lg border text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
        } ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
