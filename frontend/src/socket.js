import { io } from "socket.io-client";

const socket = io("https://your-render-url.onrender.com");

export default socket;