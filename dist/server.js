"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const websocket_utils_1 = require("./utils/websocket.utils"); // Your WebSocket handler function
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Create HTTP server from Express app
const httpServer = (0, http_1.createServer)(app_1.default);
// Setup WebSocket server (socket.io)
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" }, // You can restrict this to your frontend URL in production
});
// Initialize WebSocket handling logic
(0, websocket_utils_1.setupWebSocket)(io);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(); // Local MongoDB connection
        httpServer.listen(PORT, () => {
            console.log(`HURRY🚀 Climafy local server with WebSocket running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
});
startServer();
