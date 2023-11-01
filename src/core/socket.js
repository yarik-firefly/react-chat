import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_URI || "http://localhost:4444");

export default socket;
