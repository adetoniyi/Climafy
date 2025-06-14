import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import mongoose from "mongoose";
import { setupWebSocket } from "./utils/websocket.utils";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Attach WebSocket handling
setupWebSocket(io);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
