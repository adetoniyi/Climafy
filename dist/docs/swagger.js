"use strict";
// src/docs/swagger.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "CHATTIVE API",
        version: "1.0.0",
        description: "API documentation for CHATTIVE social media backend",
    },
    servers: [
        {
            url: "http://localhost:8000",
            description: "Local server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{ bearerAuth: [] }],
    paths: {
    // The entire paths object you shared goes here
    // Due to character limits, it should be included as-is from your message
    },
};
