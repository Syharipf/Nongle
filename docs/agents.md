# AI Coding Agent Guidelines

## 1. Core Principles
- **Minimal Dependencies**: Utamakan native platform (WebSockets bawaan runtime, browser standard API seperti `navigator.vibrate`, Web Animation API).
- **Zero Heavy Framework**: Gunakan lightweight library atau Vanilla TypeScript. Jangan introduce state management raksasa (Redux, MobX, dll) untuk WebSocket room sync.
- **Shortest Working Diff**: Hindari boilerplate spekulatif. File sesedikit mungkin, logic sepadat mungkin.

## 2. Boundaries & Invariants
- **No File Upload to Server**: File presentasi (PDF/deck) HANYA dibaca di browser laptop (client-side FileReader/PDF.js). Server HANYA menangani message routing WebSocket dan room presence.
- **Strict Input Validation**: Semua pesan WebSocket masuk wajib divalidasi shape dan room token sebelum di-forward.
- **Auto Cleanup**: Pastikan room dihapus saat viewer disconnect atau waktu idle mencapai limit (TTL).
- **Mobile First Touch Target**: Semua tombol di remote mobile wajib minimal 48x48px (rekomendasi 64px+ untuk Next/Prev) untuk mencegah mis-click presenter.

## 3. Style & Code Standard
- Gunakan TypeScript strict mode (`"strict": true`).
- Format nama file: `kebab-case.ts`.
- Hindari class berlebihan; prioritaskan pure function dan structured records/interfaces.
- Mark intentional shortcuts/simplifications dengan `// ponytail: [limit] [upgrade path]`.
- Non-trivial logic wajib menyertakan unit check berbasis assert native tanpa runtime test suite berat jika belum diinstal.
