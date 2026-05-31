import { io } from "socket.io-client";
import { getApiKey } from "@/shared/lib/apiKey";

/**
 * Singleton Socket.IO client connected to `NEXT_PUBLIC_WS_URL`.
 * Does not connect automatically — call `socket.connect()` explicitly when needed.
 *
 * `transports: ["websocket"]` skips the default HTTP long-polling upgrade handshake
 * and goes straight to WebSocket, reducing unnecessary HTTP round-trips.
 *
 * `auth` is a callback (not a plain object) so socket.io calls it before every
 * (re)connect — ensuring the API key is read fresh from storage each time rather
 * than being captured once at module load.
 */
export const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: (cb) => {
    cb({ apiKey: getApiKey() });
  },
});
