"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
        },
    });
};
exports.errorHandler = errorHandler;
