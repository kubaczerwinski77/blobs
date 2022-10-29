import { Socket } from "socket.io-client";

export interface ISocketType {
  socket: Socket;
  connected: boolean;
  lastPong: string | null;
  sendPing: () => void;
}
