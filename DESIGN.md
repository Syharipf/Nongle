# OpenDesign Visual Tokens & System

## 1. Color Palette (Dark Mode First untuk Presenter)
Presenter beroperasi di panggung redup atau ruangan presentasi; antarmuka mobile remote wajib ramah mata dan hemat daya (OLED dark).

| Token | Hex | Semantic Role |
| :--- | :--- | :--- |
| `--surface-bg` | `#0B0F19` | Latar utama (Deep obsidian) |
| `--surface-card` | `#161F30` | Kontainer kontrol & kartu status |
| `--surface-subtle` | `#1E293B` | Border & divider |
| `--text-primary` | `#F8FAFC` | Teks utama & slide counter |
| `--text-secondary` | `#94A3B8` | Subtitle, timer elapsed, label |
| `--brand-accent` | `#3B82F6` | Tombol Next & active state |
| `--danger-accent` | `#EF4444` | Blackout screen toggle |
| `--success-accent`| `#10B981` | Connection status (online) |

## 2. Typography
- **Primary Font Stack**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (Zero webfont download, instan render).
- **Scale**:
  - `counter-giant`: `48px` / Line height `1` / Weight `700` (Nomor slide di HP).
  - `timer-large`: `28px` / Monospace / Weight `600` (Timer presentasi).
  - `body-ui`: `16px` / Line height `1.5` / Weight `500`.

## 3. Border Radius & Spacing
- `--radius-btn`: `16px` (Sentuhan empuk di layar sentuh).
- `--radius-card`: `24px` (Kontainer modal & card).
- Touch Target Minimun: `64px` tinggi untuk tombol navigasi utama (Next / Prev).

## 4. Component Rules
- **Mobile Remote**:
  - Split viewport: 70% tinggi layar untuk tombol `NEXT` (ibu jari presenter paling sering menekan ini).
  - 30% bawah dibagi untuk tombol `PREV`, `BLACKOUT`, dan status timer.
  - Active state wajib memiliki feedback visual kontras tinggi (`transform: scale(0.97)` + haptic pulse 30ms).
- **Viewer Laptop**:
  - Floating QR overlay di sudut kanan bawah saat pairing belum selesai.
  - Sembunyikan semua kontrol saat mouse idle selama 3 detik di mode fullscreen.
