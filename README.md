# Portofolio — Adityodarma Judhistira

Website portofolio pribadi: mahasiswa Informatika dengan minat di AI, robotika, dan data engineering.

Static site (HTML + CSS + JS murni), tanpa build step.

## Struktur

```
.
├── index.html        → semua konten (hero, about, work, process, blog, footer)
├── css/style.css     → styling, dikelompokkan per section
├── js/main.js        → smooth scroll, accordion, menu mobile, reveal on scroll, navbar adaptif
└── assets/images/    → foto (JPG)
```

## Menjalankan lokal

Buka `index.html` di browser, atau pakai local server:

```bash
python3 -m http.server 8000
```

lalu buka http://localhost:8000.

## Deploy

Karena tidak ada build step, folder root bisa langsung di-deploy ke GitHub Pages
(Settings → Pages → branch `main`, folder `/ (root)`), Netlify, atau Vercel.

## Catatan gambar

- Pakai format **JPG/PNG/WebP**. Jangan HEIC — hanya terbaca di Safari.
- Nama file **tanpa spasi**, huruf kecil (server Linux case-sensitive).
- Resize dulu ke maks ~2000px dan kompres; di macOS bisa pakai:

  ```bash
  sips -s format jpeg -s formatOptions 80 -Z 1600 input.HEIC --out output.jpg
  ```

Foto yang dipakai: `hero-bg.jpg`, `about-main.jpg`, `service-1.jpg`, `process.jpg`, `blog-1.jpg`.
Kartu yang belum punya foto masih memakai gradient placeholder dari `style.css`.
