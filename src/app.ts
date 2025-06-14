import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import rateLimit from "express-rate-limit";

//Environment variables
dotenv.config();

// Express app setup
const app: Application = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Server Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiter
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  })
);

import authRoutes from "./routes/auth.route";
import locationRoutes from "./routes/location.route";
import weatherRoutes from "./routes/weather.route";
import alertRoutes from "./routes/alert.route";
import preferencesRoutes from "./routes/preferences.route";

connectDB();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/preferences", preferencesRoutes);

// Global Error Handler
app.use(errorHandler);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("CHATTIVE API is running 🚀");
});

connectDB();

export default app;
