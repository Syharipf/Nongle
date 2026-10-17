# Nongle (No-Dongle)

> **Zero-Dongle Presentation Hub**: Ubah smartphone apa pun menjadi clicker, touchpad kursor, dan gyro laser pointer nirkabel tanpa perlu memasang dongle USB atau menginstal software di laptop.

[![Deploy to GitHub Pages](https://github.com/Syharipf/Nongle/actions/workflows/deploy.yml/badge.svg)](https://github.com/Syharipf/Nongle/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-3B82F6?logo=pwa&logoColor=white)](https://syharipf.github.io/Nongle/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔗 Akses Cepat (Live Links)

| Perangkat | Link Akses | Fungsi |
| :--- | :--- | :--- |
| **🌐 Landing Page** | **[nongle](https://syharipf.github.io/Nongle/)** | Penjelasan & demo interaktif |
| **💻 Laptop / Layar Presentasi** | **[Buka Nongle Viewer](https://syharipf.github.io/Nongle/app.html)** | Menampilkan slide (PDF/Embed) + QR Code pairing |
| **📱 Smartphone (Remote Controller)** | **[Buka Nongle Remote](https://syharipf.github.io/Nongle/remote.html)** | Layar controller atau langsung scan QR dari laptop |

---

## 💡 About Nongle

**Nongle** lahir dari masalah nyata di panggung presentasi: USB dongle clicker fisik yang sering tertinggal, baterai clicker habis mendadak, atau laptop venue/kantor yang terkunci oleh administrator sehingga dilarang menancapkan flashdisk/dongle maupun menginstal file `.exe`/`.dmg`.

Nongle menyelesaikan ini dengan memanfaatkan **WebRTC P2P (Peer-to-Peer)**:
- **Zero-Install di Laptop**: Cukup buka web browser (Chrome, Edge, Safari, Firefox).
- **Zero-Server Cost**: Hubungan antara laptop dan HP terjadi langsung *browser-to-browser*.
- **100% Kebal Firewall**: Didukung fallback **TURN Relay over TCP Port 443**, menembus firewall korporat, kampus, atau hotel yang biasanya memblokir jaringan P2P lokal.
- **Privasi Terjaga**: File slide (PDF) dibaca langsung di memori browser lokal laptop via PDF.js. Tidak ada dokumen yang diunggah ke internet atau server mana pun.

---

## 🎮 3 Mode Pengendali di HP

1. **🔘 Clicker Mode**
   - Area sentuh tombol **NEXT** raksasa (70% layar) agar presenter tidak perlu melihat layar HP saat berbicara.
   - Gestur swipe: usap ke kiri untuk *Next*, usap ke kanan untuk *Prev*.
   - Tombol **BLANK** untuk membuat layar proyektor hitam pekat seketika.
   - **Tombol Volume Fisik**: Tekan tombol *Volume Up* untuk Next dan *Volume Down* untuk Prev langsung dari saku celana.

2. **🖱️ Touchpad Mode**
   - Layar smartphone berfungsi sebagai trackpad sentuh untuk menggerakkan titik laser merah menyala di layar laptop.
   - *Double tap* pada trackpad untuk menyalakan atau mematikan laser pointer.

3. **🎯 Gyro Air Pointer**
   - Manfaatkan sensor kemiringan (*gyroscope*) ponsel pintar. Arahkan HP ke layar proyektor layaknya tongkat komando (*magic wand* / laser pointer asli).
   - Tahan tombol tengah untuk memancarkan laser; lepaskan untuk memadamkan seketika.
   - Tombol kalibrasi `🎯 Center` untuk mengunci titik tengah pointer.

---

## 📲 Install sebagai Aplikasi HP (PWA)

Nongle mendukung standar **Progressive Web App (PWA)**:
1. Buka [https://syharipf.github.io/Nongle/remote.html](https://syharipf.github.io/Nongle/remote.html) di browser HP (Chrome / Safari).
2. Tap tombol menu browser $\to$ pilih **"Tambahkan ke Layar Utama" / "Add to Home screen" / "Install App"**.
3. Nongle akan terpasang di HP seperti aplikasi native: berjalan fullscreen tanpa bilah alamat browser, responsif, dan hemat baterai.

---

## 🛠️ Menjalankan Lokal (Self-Host)

Jika ingin menjalankan Nongle di server lokal atau jaringan offline tertutup:

```bash
# Pastikan Bun terpasang (https://bun.sh)
bun install

# Menjalankan server lokal
bun start

# Menjalankan automated test
bun test
```
- Landing page lokal di `http://localhost:3000`, Laptop Viewer di `http://localhost:3000/app.html`
- Akses Mobile Remote di `http://<IP-LAPTOP>:3000/remote.html`
