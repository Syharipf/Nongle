# Graphify: Codebase Architecture & AST Knowledge Graph

## 1. Overview
Graphify memetakan keterkaitan simbol AST, modul, dan dependency graph untuk repositori ini.

## 2. Installation & Setup
Instalasi CLI `graphifyy`:
```bash
# Global atau local npx / bunx
npm install -g graphifyy
# atau via bun:
bun add -g graphifyy
```

## 3. Ekstraksi AST
Untuk mengekstraksi struktur file, dependensi impor, dan relasi simbol ke dalam graph data:
```bash
# Jalankan ekstraksi seluruh codebase ke output folder .graphify/
graphify extract --dir . --out .graphify/ast-graph.json

# Opsi incremental update
graphify extract --watch
```

## 4. Query Modul & Navigasi Arsitektur
Gunakan query CLI untuk menelusuri dependensi sebelum refactor:
```bash
# Cek semua consumers dari room-engine
graphify query "dependents(services/room-engine.ts)"

# Cek dependencies dari WebSocket Gateway
graphify query "dependencies(routes/ws-gateway.ts)"

# Validasi modul tidak memiliki circular dependency
graphify lint --rule no-cycles
```

## 5. Visual Graph Mapping
Graph relasi visual tercermin pada file `docs/architecture.md` bagian `5. Module Dependency Map & Architecture Graph`.
