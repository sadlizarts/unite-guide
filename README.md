# UNITE Guide — Roster Sadli

Web app (PWA) offline-first: panduan cara main tiap Pokémon UNITE di roster lo — skill & kapan ditekan, build + item, urutan combo, situasi (gank/kabur/objective/duel/teamfight), kesalahan umum, dan matchup.

## Cara publish ke GitHub Pages (± 3 menit)

1. Di GitHub, bikin repo baru, misal `unite-guide` (public, **tanpa** README).
2. Upload semua isi folder ini ke root repo (`index.html`, `data.js`, `sw.js`, `manifest.webmanifest`, folder `img/` dan `icons/`).
   - Dari laptop: buka repo → **Add file → Upload files** → drag seluruh isi folder → Commit.
   - Atau pakai git:
     ```bash
     cd unite-guide
     git init && git add . && git commit -m "UNITE Guide v2026-10-03"
     git branch -M main
     git remote add origin https://github.com/<username-lo>/unite-guide.git
     git push -u origin main
     ```
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Tunggu ±1 menit, buka `https://<username-lo>.github.io/unite-guide/`.

## Install di HP

- **Android (Chrome):** buka link di atas → tombol **⬇ Install** di pojok kanan atas (atau menu ⋮ → *Add to Home screen*).
- **iPhone (Safari):** buka link → tombol Share → **Add to Home Screen**.

Setelah terinstal, app jalan offline sepenuhnya (service worker cache semua file).

## Update data

- Semua konten ada di `data.js` (array `window.UNITE_DATA`). Edit → commit → push. Ganti `window.UNITE_VERSION` dan `CACHE` di `sw.js` supaya HP ngambil versi baru.
- Nambah Pokémon: tambah objek baru dengan struktur yang sama + foto `img/<slug>.webp` + tambahkan path fotonya ke `PRECACHE` di `sw.js`.

## Sumber

Nama move/level dicek silang Serebii + Bulbapedia; build & item dari game8 / dittobase; patch notes 2025–2026 dari Serebii & pokemonunite.jp. Sebagian matchup adalah inferensi mekanik (lihat tab Matchup → "Sumber & catatan" di tiap Pokémon). Deskripsi adalah ringkasan praktis, bukan teks game verbatim.
