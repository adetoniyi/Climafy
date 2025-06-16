import { Server } from "socket.io";

let io: Server;

export const setupWebSocket = (server: Server) => {
  io = server;
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("disconnect", () =>
      console.log("Client disconnected:", socket.id)
    );
  });
};

export const broadcastSevereAlert = (message: string) => {
  if (io) {
    io.emit("severe-weather-alert", { message });
  }
};
