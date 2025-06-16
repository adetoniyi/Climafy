"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middlewares/error.middleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
//Environment variables
dotenv_1.default.config();
// Express app setup
const app = (0, express_1.default)();
// Global middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// Server Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Rate limiter
app.use("/api", (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
}));
const alert_route_1 = __importDefault(require("./routes/alert.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const location_route_1 = __importDefault(require("./routes/location.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const weather_route_1 = __importDefault(require("./routes/weather.route"));
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Routes
app.use("/api/alerts", alert_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/locations", location_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/weather", weather_route_1.default);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });
});
// Health check
app.get("/", (_req, res) => {
    res.send("CHATTIVE API is running 🚀");
});
(0, db_1.default)();
exports.default = app;
