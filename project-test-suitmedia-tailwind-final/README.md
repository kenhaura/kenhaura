
# Project Test - Suitmedia Ideas Page

Halaman daftar ide (Ideas Page) sesuai dengan desain dan requirement Suitmedia, dikembangkan menggunakan HTML, Tailwind CSS, dan JavaScript murni dengan integrasi API.

## ✅ Fitur yang Tersedia
- Header yang hide saat scroll ke bawah dan muncul saat scroll ke atas (dengan efek transparan)
- Banner dengan efek parallax pada teks dan bagian bawah miring
- Sort by: Terbaru / Terlama
- Pilihan item per halaman: 10, 20, 50
- Pagination
- Persistensi state sort/page/perPage menggunakan `localStorage`
- Lazy-loading gambar
- Rasio gambar konsisten (4:3)
- Judul post dibatasi maksimal 3 baris dengan `...`
- Proxy API `/api/ideas` ke `https://suitmedia-backend.suitdev.com/api/ideas`

## 🚀 Cara Menjalankan (Development)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

## 🔧 Build untuk Produksi
```bash
npm run build
npm run preview
```

## 🌐 Contoh Format Jawaban (isi sesuai user)

- **Url repository**: `https://gitlab.com/user/project-test-namauser`
- **Url deployment**: `https://project-test-namauser.netlify.app` atau `https://project-test-namauser.vercel.app`

---

## 📝 Catatan Penting
Pastikan Anda:
- Mengaktifkan proxy API di `vite.config.js`
- Deploy via Netlify/Vercel dengan konfigurasi SPA (`index.html` sebagai fallback)
- Telah menginstall plugin Tailwind `@tailwindcss/line-clamp`:
  ```bash
  npm install -D @tailwindcss/line-clamp
  ```

Dan aktifkan di `tailwind.config.js`:
```js
plugins: [require('@tailwindcss/line-clamp')],
```

Terima kasih!
