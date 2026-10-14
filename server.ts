import os from 'node:os';
import crypto from 'node:crypto';
import path from 'node:path';
import type { ServerWebSocket } from 'bun';

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(import.meta.dir, 'public');

export interface WsContext {
  boundRoomId: string | null;
  isViewer: boolean;
}

export interface RoomData {
  viewer: ServerWebSocket<WsContext>;
  remotes: Set<ServerWebSocket<WsContext>>;
  currentSlide: number;
  totalSlides: number;
  isBlackout: boolean;
}

// ponytail: in-memory map. upgrade path: Redis pub/sub if scaling multi-instance.
export const rooms = new Map<string, RoomData>();

export function getLocalIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

export function createServer(customPort = PORT) {
  return Bun.serve<WsContext>({
    port: customPort,
    fetch(req, server) {
      const url = new URL(req.url);

      if (url.pathname === '/api/info') {
        return Response.json({ ip: getLocalIp(), port: server.port });
      }

      const upgraded = server.upgrade(req, {
        data: { boundRoomId: null, isViewer: false }
      });
      if (upgraded) return undefined;

      const relPath = url.pathname === '/' ? 'index.html' : url.pathname;
      const safePath = path.normalize(path.join(PUBLIC_DIR, relPath));
      if (!safePath.startsWith(PUBLIC_DIR)) {
        return new Response('Forbidden', { status: 403 });
      }

      return new Response(Bun.file(safePath));
    },
    websocket: {
      open() {},
      message(ws, raw) {
        try {
          const msg = JSON.parse(raw.toString()) as Record<string, unknown>;

          if (msg.type === 'CREATE_ROOM') {
            const roomId = crypto.randomBytes(3).toString('hex').toUpperCase();
            ws.data.boundRoomId = roomId;
            ws.data.isViewer = true;
            rooms.set(roomId, {
              viewer: ws,
              remotes: new Set(),
              currentSlide: 1,
              totalSlides: 1,
              isBlackout: false
            });
            ws.send(JSON.stringify({ type: 'ROOM_CREATED', roomId }));
            return;
          }

          if (msg.type === 'JOIN_ROOM' && typeof msg.roomId === 'string') {
            const targetRoomId = msg.roomId;
            const room = rooms.get(targetRoomId);
            if (!room) {
              return ws.send(JSON.stringify({ type: 'ERROR', message: 'Room tidak ditemukan' }));
            }
            ws.data.boundRoomId = targetRoomId;
            ws.data.isViewer = false;
            room.remotes.add(ws);
            ws.send(JSON.stringify({
              type: 'ROOM_JOINED',
              roomId: targetRoomId,
              state: {
                currentSlide: room.currentSlide,
                totalSlides: room.totalSlides,
                isBlackout: room.isBlackout
              }
            }));
            room.viewer.send(JSON.stringify({ type: 'REMOTE_CONNECTED', count: room.remotes.size }));
            return;
          }

          const roomId = ws.data.boundRoomId;
          if (!roomId) return;
          const room = rooms.get(roomId);
          if (!room) return;

          if ((msg.type === 'NAVIGATE' || msg.type === 'POINTER_MOVE') && !ws.data.isViewer) {
            room.viewer.send(JSON.stringify(msg));
            return;
          }

          if (msg.type === 'SET_BLACKOUT') {
            room.isBlackout = Boolean(msg.state);
            const broadcast = JSON.stringify({ type: 'BLACKOUT_UPDATED', isBlackout: room.isBlackout });
            room.viewer.send(broadcast);
            for (const remote of room.remotes) remote.send(broadcast);
            return;
          }

          if (msg.type === 'UPDATE_STATE' && ws.data.isViewer) {
            room.currentSlide = typeof msg.currentSlide === 'number' ? msg.currentSlide : room.currentSlide;
            room.totalSlides = typeof msg.totalSlides === 'number' ? msg.totalSlides : room.totalSlides;
            const broadcast = JSON.stringify({
              type: 'STATE_UPDATED',
              currentSlide: room.currentSlide,
              totalSlides: room.totalSlides
            });
            for (const remote of room.remotes) remote.send(broadcast);
          }
        } catch {
          // ignore malformed payload
        }
      },
      close(ws) {
        const roomId = ws.data.boundRoomId;
        if (!roomId) return;
        const room = rooms.get(roomId);
        if (!room) return;

        if (ws.data.isViewer) {
          for (const remote of room.remotes) {
            remote.send(JSON.stringify({ type: 'VIEWER_DISCONNECTED' }));
          }
          rooms.delete(roomId);
        } else {
          room.remotes.delete(ws);
          room.viewer.send(JSON.stringify({ type: 'REMOTE_DISCONNECTED', count: room.remotes.size }));
        }
      }
    }
  });
}

if (import.meta.main) {
  const server = createServer(PORT);
  const ip = getLocalIp();
  console.log(`Bun server jalan:`);
  console.log(`- Laptop Viewer: http://localhost:${server.port}`);
  console.log(`- Mobile Remote: http://${ip}:${server.port}/remote.html`);
}
