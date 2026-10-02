# BrandElevate — Website Project

Struktur folder:

```
project/
├── index.html          → semua konten halaman (navbar, hero, about, services, process, blog, footer)
├── css/
│   └── style.css        → semua styling, sudah dipisah per section dengan komentar
├── js/
│   └── main.js           → smooth scroll + accordion interaktif di section "My Coaching Process"
├── assets/
│   └── images/
│       └── hero-bg.jpg   → foto background hero (starfish, dari upload kamu)
└── README.md
```

## Cara pakai

1. Buka `index.html` langsung di browser, atau jalankan lewat local server
   (misalnya ekstensi "Live Server" di VS Code) supaya path gambar terbaca dengan benar.
2. Semua warna, ukuran, dan jarak diatur di `css/style.css` — dikelompokkan per section
   dengan komentar `/* ================= NAMA SECTION ================= */`.

## Mengganti foto placeholder

Beberapa bagian masih pakai **gradient sebagai placeholder foto** (karena foto aslinya
belum ada), yaitu:

| Bagian | Class di CSS | Lokasi disarankan |
|---|---|---|
| Foto utama About | `.main-photo` | `assets/images/about-main.jpg` |
| Foto kecil kartu About | `.float-photo` | `assets/images/about-studio.jpg` |
| Foto tiap kartu Services | `.card-photo` | `assets/images/service-1.jpg`, dst |
| Foto Coaching Process | `.process-photo` | `assets/images/process.jpg` |
| Foto tiap kartu Blog | `.photo-1`, `.photo-2`, `.photo-3` | `assets/images/blog-1.jpg`, dst |

Untuk mengganti, taruh file foto di folder `assets/images/`, lalu di `style.css` cari
class terkait dan tambahkan/ganti baris:

```css
.main-photo {
  background-image: url("../assets/images/about-main.jpg");
  background-size: cover;
  background-position: center;
}
```

Komentar contoh sudah saya sisipkan langsung di bawah tiap class placeholder di
`style.css`, tinggal uncomment dan sesuaikan nama filenya.

## Mengganti foto hero

Foto hero sudah terpasang otomatis dari `assets/images/hero-bg.jpg`. Untuk ganti,
tinggal timpa file itu dengan foto baru (nama file sama), atau ubah path di
`style.css` pada class `.hero-bg`.

## Menyesuaikan isi teks

Semua teks (judul, deskripsi, tanggal, dsb) ada langsung di `index.html` — cari
bagian yang mau diubah sesuai komentar `<!-- ================= NAMA SECTION ================= -->`.

## Menambahkan section baru / halaman baru

Untuk website multi-halaman (misalnya halaman About terpisah), duplikat `index.html`
jadi `about.html`, lalu tetap pakai `css/style.css` dan `js/main.js` yang sama supaya
tampilan konsisten.
# My-Portofolio
