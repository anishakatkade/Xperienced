import { io } from "socket.io-client";

const socket = io("https://xperienced.onrender.com", {
  transports: ["websocket"],
});

export default socket;