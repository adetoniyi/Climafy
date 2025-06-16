import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupWebSocket } from "./utils/websocket.utils"; // Your WebSocket handler function

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server from Express app
const httpServer = createServer(app);

// Setup WebSocket server (socket.io)
const io = new Server(httpServer, {
  cors: { origin: "*" }, // You can restrict this to your frontend URL in production
});

// Initialize WebSocket handling logic
setupWebSocket(io);

const startServer = async () => {
  try {
    await connectDB(); // Local MongoDB connection
    httpServer.listen(PORT, () => {
      console.log(
        `HURRY🚀 Climafy local server with WebSocket running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
