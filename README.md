# Nongle

> **No-Dongle Presentation Hub**: Jadikan HP sebagai clicker, touchpad, dan gyro laser pointer tanpa install aplikasi apapun di laptop maupun di HP.

---

## Masalah yang Diselesaikan
- Lupa bawa USB clicker fisik atau dongle hilang.
- Laptop kantor dibatasi admin (dilarang colok USB atau install software `.exe`/`.dmg`).
- Ingin kendali slide bebas bergerak di panggung dengan feedback getar dan laser pointer.

## Cara Kerja
1. Buka browser di laptop (`http://localhost:3000`).
2. Scan QR code di layar laptop menggunakan kamera bawaan HP (iOS / Android).
3. Browser HP langsung terhubung sebagai remote controller instan via native WebSocket.

## 3 Mode di HP
- **🔘 Clicker**: Tombol Next raksasa (70% layar), tombol Previous, Blankout screen (`BLANK`), dan gestur swipe kanan-kiri.
- **🖱️ Touchpad**: Area trackpad sentuh untuk menggerakkan laser pointer merah di layar laptop.
- **🎯 Gyro Air Pointer**: Laser pointer mengikuti gerakan kemiringan HP di udara (seperti remote Wii / presenter wand). Tahan tombol untuk menyalakan laser.

## Fitur Unggulan
- **Zero-Install**: Murni HTML5 + WebSocket native.
- **Client-Side Rendering**: File presentasi (PDF) dibuka langsung di memori browser laptop via PDF.js. Tidak ada file yang diunggah ke internet/server (privasi terjamin).
- **Anti-Sleep / WakeLock**: Layar HP tetap menyala selama presentasi berlangsung.
- **Stopwatch Presenter**: Timer durasi bicara presenter di HP.
- **Local Network Support**: Berfungsi via hotspot / WiFi lokal tanpa butuh kuota internet publik.

## Menjalankan Aplikasi

```bash
# Pastikan Bun terpasang (https://bun.sh)
bun start

# Menjalankan unit test
bun test
```
