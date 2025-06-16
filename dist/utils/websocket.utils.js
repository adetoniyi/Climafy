"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastSevereAlert = exports.setupWebSocket = void 0;
let io;
const setupWebSocket = (server) => {
    io = server;
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
    });
};
exports.setupWebSocket = setupWebSocket;
const broadcastSevereAlert = (message) => {
    if (io) {
        io.emit("severe-weather-alert", { message });
    }
};
exports.broadcastSevereAlert = broadcastSevereAlert;
