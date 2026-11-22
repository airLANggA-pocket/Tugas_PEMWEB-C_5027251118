// src/services/api.js
// Layanan komunikasi dengan backend REST API (http://localhost:4000/api/products)

export const BASE_URL = "http://localhost:4000";
export const API_URL = `${BASE_URL}/api/products`;

export const formatRupiah = (angka) => {
  if (typeof angka !== "number" || isNaN(angka)) return "Rp0";
  return `Rp${angka.toLocaleString("id-ID")}`;
};

export const normalizeProduct = (item) => ({
  id: item.id,
  name: item.name,
  price: Number(item.price),
  createdAt: item.createdAt || null,
  updatedAt: item.updatedAt || null,
});

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Gagal membaca respons dari server (bukan JSON).");
  }

  if (!response.ok) {
    const errorMsg = data?.message || `Permintaan gagal dengan status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function fetchProducts(searchQuery = "") {
  const url = searchQuery.trim()
    ? `${API_URL}?search=${encodeURIComponent(searchQuery.trim())}`
    : API_URL;
  const result = await apiRequest(url);
  return (result.data || []).map(normalizeProduct);
}

export async function fetchProductById(id) {
  const result = await apiRequest(`${API_URL}/${id}`);
  if (!result.data) {
    throw new Error("Data produk tidak ditemukan.");
  }
  return normalizeProduct(result.data);
}

export async function createProduct({ name, price }) {
  const result = await apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, price: Number(price) }),
  });
  return {
    product: normalizeProduct(result.data),
    message: result.message || "Produk berhasil ditambahkan.",
  };
}

export async function updateProduct(id, { name, price }) {
  const result = await apiRequest(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, price: Number(price) }),
  });
  return {
    product: normalizeProduct(result.data),
    message: result.message || "Produk berhasil diperbarui.",
  };
}

export async function deleteProduct(id) {
  const result = await apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return {
    deleted: result.data ? normalizeProduct(result.data) : null,
    message: result.message || "Produk berhasil dihapus.",
  };
}

export async function checkServerHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}
