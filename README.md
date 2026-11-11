# Track Generator Pro — Login + App

Paket siap upload ke GitHub Pages / static hosting.

## Struktur

```
index.html                 → halaman login (entry)
css/style.css              → style login
js/app.js                  → logika login + redirect
assets/icons/              → ikon SVG
tracking-generator.html    → aplikasi utama (butuh login)
```

## Akun

| Field    | Nilai        |
|----------|--------------|
| Username | `Buahmentah` |
| Password | `Buahtinggal`|

## Alur

1. Buka `index.html`
2. Login dengan akun di atas
3. Diarahkan ke `tracking-generator.html`
4. Tanpa sesi login, app mengalihkan kembali ke `index.html`
5. Tombol **Keluar** menghapus sesi

Centang **Ingat saya** → sesi disimpan di `localStorage` (bertahan tutup browser).  
Tanpa centang → `sessionStorage` (hilang saat tab ditutup).

## Catatan keamanan

Autentikasi ini **frontend-only** (cocok demo / internal).  
Username & password ada di `js/app.js` dan bisa dilihat di source.  
Untuk produksi, hubungkan ke backend / auth server.

## Deploy GitHub Pages

1. Push folder ini sebagai root repo (atau `/docs`)
2. Aktifkan Pages → source branch
3. URL akan membuka `index.html` otomatis
