# Workspace Desain & User Journey (OpenDesign Sync)

## 1. Ringkasan Visual User Journey

1. **Step 1: Setup di Laptop**
   - User buka web di browser laptop.
   - Drag-and-drop file slide PDF atau pilih presentasi sample.
   - Web menampilkan slide pertama dan overlay QR Code pairing.

2. **Step 2: Pairing di HP**
   - User scan QR Code dengan kamera bawaan HP (tidak perlu download aplikasi).
   - Browser HP langsung membuka antarmuka remote minimalis.
   - Overlay QR Code di laptop otomatis lenyap saat HP terhubung (status pill: "Remote Connected").

3. **Step 3: Presentasi Berjalan**
   - Layar HP berubah jadi clicker ergonomis (area Next lebar di bawah jempol).
   - Haptic feedback bergetar halus tiap slide berpindah.
   - Stopwatch menghitung durasi bicara presenter.

## 2. Sinkronisasi dengan OpenDesign
- Export design specs atau frame JSON dari OpenDesign ke direktori `design/prototypes/`.
- Letakkan icon SVG, preview snapshot, dan wireframe di direktori `design/assets/`.
- Nilai token pada `DESIGN.md` menjadi acuan variabel CSS/Tailwind config pada implementasi frontend.
