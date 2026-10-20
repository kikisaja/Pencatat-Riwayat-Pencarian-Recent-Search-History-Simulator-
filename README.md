# 🔍 Recent Search History Simulator

Aplikasi simulasi pencarian interaktif (*Recent Search History Simulator*) berbasis JavaScript yang menyimpan dan menampilkan 5 kata kunci pencarian terakhir secara otomatis menggunakan *LocalStorage*.

---

## 🎯 Konsep Pembelajaran RPL / Pemrograman Web

1. **LocalStorage Web API:**
   Menyimpan data riwayat pengguna secara parsial di peramban web (`localStorage.setItem` & `localStorage.getItem`) agar tidak hilang saat halaman dimuat ulang.
2. **Array Capping & Unshift Pattern:**
   Menggunakan metode `unshift()` untuk menempatkan pencarian terbaru di urutan teratas serta `slice(0, 5)` untuk membatasi kuota maksimal 5 riwayat.
3. **Array Deduplication Filter:**
   Memfilter elemen array guna mencegah duplikasi kata kunci yang sama sebelum ditambahkan ke riwayat.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Form pencarian, container tag riwayat, & box hasil simulasi
├── style.css        # Desain Neobrutalism pink-pop, tag interaktif, & animasi popIn
└── script.js        # Logika LocalStorage, manajemen batas 5 array, & handler DOM
