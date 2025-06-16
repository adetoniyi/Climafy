"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const websocket_utils_1 = require("./utils/websocket.utils");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
// Attach WebSocket handling
(0, websocket_utils_1.setupWebSocket)(io);
// MongoDB connection
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error("MongoDB connection error:", err));
