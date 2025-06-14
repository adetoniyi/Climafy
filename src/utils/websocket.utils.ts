import { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";

let wss: WebSocketServer;

export const setupWebSocket = (server: HttpServer) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    ws.send(JSON.stringify({ message: "WebSocket connection established." }));

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
};

export const broadcastAlert = (data: object) => {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      // 1 = OPEN
      client.send(JSON.stringify(data));
    }
  });
};
