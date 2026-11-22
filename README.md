# Tugas 4 – React Router, Tailwind CSS, dan Integrasi Backend

Proyek pengembangan aplikasi frontend **Manajemen Produk Koperasi** untuk mata kuliah **Pemrograman Web (Kelas C)**. Pada tugas ini, aplikasi ditingkatkan dengan integrasi **React Router** untuk navigasi SPA berbasis URL, penataan antarmuka menggunakan **Tailwind CSS**, penerapan pola arsitektur **Atomic Design**, serta integrasi penuh dengan REST API backend.

---

## Identitas Pengembang

- **Nama:** Pradipta Airlangga Ramadhan
- **NIM:** 5027251118
- **Mata Kuliah:** Pemrograman Web (Kelas C)
- **Modul:** Pertemuan 13 – React Router & Tailwind CSS

---

## Fitur Utama

### 01 · Pengelolaan Produk (CRUD Lengkap)
- **Lihat Produk:** Menampilkan katalog produk dari backend (`GET /api/products`) dengan opsi tampilan **Grid** atau **List**.
- **Tambah Produk:** Formulir modal interaktif untuk menambahkan produk baru dengan validasi ketat nama dan nominal harga (`POST /api/products`).
- **Edit Produk:** Memperbarui nama dan harga produk yang tersimpan di server (`PUT /api/products/:id`).
- **Hapus Produk:** Menghapus produk dengan dialog konfirmasi (`DELETE /api/products/:id`).
- **Pencarian Real-time:** Pencarian produk berdasarkan nama secara instan.
- **Notifikasi Feedback:** Toast mengambang untuk memberikan informasi status keberhasilan maupun kegagalan aksi API.

### 02 · Halaman Detail Produk (`/products/:id`)
- Tautan navigasi **Detail** pada setiap kartu/baris produk mengarah ke `/products/:id`.
- Mengambil parameter URL menggunakan hook `useParams()` dari React Router.
- Membaca data spesifik produk langsung dari REST API (`GET /api/products/:id`).
- Dilengkapi tombol/link **Kembali ke Daftar Produk**.
- Penanganan kondisi error jelas jika ID produk tidak ditemukan di server (respons 404).

### 03 · Halaman 404 (Not Found Route)
- Rute wildcard (`path="*"`) menangani seluruh URL yang tidak terdaftar di aplikasi.
- Menampilkan pesan kesalahan informatif dan tombol navigasi kembali ke halaman utama atau daftar produk.

### 04 · Penataan Antarmuka dengan Tailwind CSS
- Menggunakan Tailwind CSS v4 dengan pendekatan *utility-first* dan tata letak responsif (*mobile-first*).
- Menata komponen navigasi Navbar (dengan status aktif via `NavLink`), kartu produk, formulir modal, halaman detail, dan halaman pengaturan.
- Tata letak grid dinamis: 1 kolom (mobile), 2 kolom (tablet `md:`), dan 3 kolom (desktop `lg:`).

### 05 · Pengaturan Tampilan (Settings & Preferences)
- Halaman `/settings` memungkinkan pengguna memilih tata letak default: **Grid View** atau **List View**.
- Preferensi disimpan pada `localStorage` browser dan langsung diterapkan pada katalog produk.

---

## Arsitektur Atomic Design

Struktur folder komponen dirancang terorganisasi berdasarkan konsep *Atomic Design*:

```
src/
├── components/
│   ├── atoms/
│   │   ├── Badge.jsx            # Lencana untuk ID dan status
│   │   ├── Button.jsx           # Tombol dengan varian: primary, secondary, danger, outline
│   │   ├── Card.jsx             # Kontainer kartu serbaguna
│   │   └── Input.jsx            # Form input dengan penanganan error dan label
│   ├── molecules/
│   │   ├── ProductCard.jsx      # Kartu produk dengan info dan tombol aksi
│   │   ├── ProductListItem.jsx  # Tampilan baris produk untuk mode List
│   │   ├── SearchBar.jsx        # Kolom pencarian dengan ikon & reset
│   │   ├── StatCard.jsx         # Kartu statistik ringkasan dashboard
│   │   └── Toast.jsx            # Notifikasi umpan balik aksi pengguna
│   └── organisms/
│       ├── DeleteModal.jsx      # Dialog konfirmasi penghapusan produk
│       ├── Navbar.jsx           # Navigasi utama dengan NavLink aktif & responsive toggle
│       ├── ProductFormModal.jsx # Modal formulir tambah dan edit produk
│       └── ProductGrid.jsx      # Kontainer grid/list produk dengan skeleton loading
├── layouts/
│   └── AppLayout.jsx            # Shared layout dengan Navbar dan <Outlet />
├── pages/
│   ├── DashboardPage.jsx        # Halaman dashboard metrik dan ringkasan produk
│   ├── NotFoundPage.jsx         # Halaman 404 untuk rute yang tidak dikenal
│   ├── ProductDetailPage.jsx    # Halaman detail produk berdasarkan parameter ID
│   ├── ProductsPage.jsx         # Halaman manajemen produk (CRUD & filter)
│   └── SettingsPage.jsx         # Halaman preferensi tampilan (Grid / List) & status API
├── services/
│   └── api.js                   # Client REST API untuk komunikasi ke backend port 4000
├── App.jsx                      # Definisi rute aplikasi (Routes & Route)
├── index.css                    # Import Tailwind CSS (@import "tailwindcss")
└── main.jsx                     # Entry point aplikasi dengan BrowserRouter
```

---

## Daftar Rute & Navigasi

| Path | Komponen Halaman | Deskripsi |
|---|---|---|
| `/` | `DashboardPage` | Tinjauan metrik statistik, total produk, nilai inventaris, dan produk terbaru |
| `/products` | `ProductsPage` | Katalog lengkap produk, pencarian, dan pemicu modal CRUD |
| `/products/:id` | `ProductDetailPage` | Halaman detail produk berdasarkan parameter URL `:id` |
| `/settings` | `SettingsPage` | Konfigurasi preferensi tata letak (Grid / List view) dan info server |
| `*` | `NotFoundPage` | Halaman penanganan error 404 untuk URL yang tidak terdaftar |

---

## Langkah Menjalankan Aplikasi

### 1. Menjalankan Backend Service (Terminal 1)
Masuk ke direktori repositori backend dan jalankan server:

```bash
cd Tugas-3-BE_PEMWEB-C_5027251118
npm install
npm run dev
```

Server backend akan aktif di: `http://localhost:4000` (dapat dicek via `http://localhost:4000/health`).

### 2. Menjalankan Frontend React (Terminal 2)
Masuk ke direktori frontend dan jalankan Vite:

```bash
cd Tugas-3_PEMWEB-C_5027251118
npm install
npm run dev
```

Buka URL lokal yang ditampilkan (biasanya `http://localhost:5173`) pada browser Anda.
