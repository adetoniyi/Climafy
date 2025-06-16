"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" &&
            decoded !== null &&
            "id" in decoded &&
            "role" in decoded) {
            req.user = { id: decoded.id, role: decoded.role };
            next();
        }
        else {
            return res.status(400).json({ message: "Invalid token payload" });
        }
    }
    catch (_b) {
        return res.status(400).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
