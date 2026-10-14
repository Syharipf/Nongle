import { test, expect, afterAll } from 'bun:test';
import { createServer, rooms } from '../server';

const server = createServer(0);
const wsUrl = `ws://127.0.0.1:${server.port}`;

afterAll(() => {
  server.stop(true);
});

test('Viewer create room, Remote join, navigate & pointer move via Bun WebSocket', async () => {
  const viewerWs = new WebSocket(wsUrl);

  const roomId = await new Promise<string>((resolve) => {
    viewerWs.addEventListener('open', () => {
      viewerWs.send(JSON.stringify({ type: 'CREATE_ROOM' }));
    });
    viewerWs.addEventListener('message', (e) => {
      const data = JSON.parse(e.data as string) as Record<string, unknown>;
      if (data.type === 'ROOM_CREATED' && typeof data.roomId === 'string') {
        resolve(data.roomId);
      }
    });
  });

  expect(roomId).toBeTruthy();
  expect(rooms.has(roomId)).toBe(true);

  const remoteWs = new WebSocket(wsUrl);
  await new Promise<void>((resolve) => {
    remoteWs.addEventListener('open', () => {
      remoteWs.send(JSON.stringify({ type: 'JOIN_ROOM', roomId }));
    });
    remoteWs.addEventListener('message', (e) => {
      const data = JSON.parse(e.data as string) as Record<string, unknown>;
      if (data.type === 'ROOM_JOINED') {
        expect(data.roomId).toBe(roomId);
        resolve();
      }
    });
  });

  // Test Navigate
  const navPromise = new Promise<Record<string, unknown>>((resolve) => {
    viewerWs.addEventListener('message', (e) => {
      const data = JSON.parse(e.data as string) as Record<string, unknown>;
      if (data.type === 'NAVIGATE' && data.action === 'NEXT') {
        resolve(data);
      }
    });
  });

  remoteWs.send(JSON.stringify({ type: 'NAVIGATE', action: 'NEXT' }));
  const receivedNav = await navPromise;
  expect(receivedNav.action).toBe('NEXT');

  // Test Pointer Move
  const pointerPromise = new Promise<Record<string, unknown>>((resolve) => {
    viewerWs.addEventListener('message', (e) => {
      const data = JSON.parse(e.data as string) as Record<string, unknown>;
      if (data.type === 'POINTER_MOVE') {
        resolve(data);
      }
    });
  });

  remoteWs.send(JSON.stringify({ type: 'POINTER_MOVE', visible: true, x: 45, y: 60 }));
  const receivedPointer = await pointerPromise;
  expect(receivedPointer.visible).toBe(true);
  expect(receivedPointer.x).toBe(45);
  expect(receivedPointer.y).toBe(60);

  viewerWs.close();
  remoteWs.close();
});
