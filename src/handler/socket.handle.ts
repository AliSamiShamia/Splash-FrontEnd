import io from "socket.io-client";

const socket = io(process.env.socketIO ?? "", {
  transports: ["websocket"],
});

socket.emit("init", { message: "Hello from client!" });

