import { io } from "socket.io-client";
import { API_URL } from "./axiosClient";

export const socket = io(API_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});
