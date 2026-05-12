import { io } from "socket.io-client";
import { getApiKey } from "@/shared/lib/apiKey";

export const socket = io(process.env.NEXT_PUBLIC_WS_URL, {
  autoConnect: false,
  transports: ["websocket"],
  auth: (cb) => {
    cb({ apiKey: getApiKey() });
  },
});
