"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Climafy Weather API",
        version: "1.0.0",
        description: "API documentation for Climafy Weather Forecast & Alert Service",
    },
    servers: [
        {
            url: "http://localhost:5000",
            description: "Local server",
        },
    ],
    paths: {
        "/api/auth/register": {
            post: {
                summary: "Register a new user",
                tags: ["Authentication"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["username", "email", "password"],
                                properties: {
                                    username: { type: "string", example: "johndoe" },
                                    email: { type: "string", example: "johndoe@example.com" },
                                    password: { type: "string", example: "password123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "User registered successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: { type: "object" },
                                        token: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "400": { description: "Bad Request" },
                },
            },
        },
        "/api/auth/login": {
            post: {
                summary: "Login user and get token",
                tags: ["Authentication"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: { type: "string", example: "johndoe@example.com" },
                                    password: { type: "string", example: "password123" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User logged in successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: { type: "object" },
                                        token: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Invalid credentials" },
                },
            },
        },
        "/api/users/preferences": {
            get: {
                summary: "Get user preferences",
                tags: ["Users"],
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "User preferences retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        unit: { type: "string", example: "metric" },
                                        severeAlerts: { type: "boolean", example: true },
                                        customAlerts: { type: "boolean", example: true },
                                    },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                },
            },
            put: {
                summary: "Update user preferences",
                tags: ["Users"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    unit: {
                                        type: "string",
                                        enum: ["metric", "imperial"],
                                        example: "imperial",
                                    },
                                    severeAlerts: { type: "boolean", example: false },
                                    customAlerts: { type: "boolean", example: true },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "User preferences updated successfully" },
                    "400": { description: "Invalid request body" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/locations": {
            post: {
                summary: "Add a new location for the user",
                tags: ["Locations"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "latitude", "longitude"],
                                properties: {
                                    name: { type: "string", example: "Home" },
                                    latitude: { type: "number", example: 6.5244 },
                                    longitude: { type: "number", example: 3.3792 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "Location added successfully" },
                    "400": { description: "Invalid request body" },
                },
            },
            get: {
                summary: "Get all locations for the authenticated user",
                tags: ["Locations"],
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "List of user locations",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { type: "object" },
                                },
                            },
                        },
                    },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/locations/{id}": {
            put: {
                summary: "Update a location by ID",
                tags: ["Locations"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Location ID",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: { type: "string", example: "Work" },
                                    latitude: { type: "number", example: 6.6 },
                                    longitude: { type: "number", example: 3.4 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Location updated successfully" },
                    "404": { description: "Location not found" },
                },
            },
            delete: {
                summary: "Delete a location by ID",
                tags: ["Locations"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "Location ID",
                    },
                ],
                responses: {
                    "200": { description: "Location deleted successfully" },
                    "404": { description: "Location not found" },
                },
            },
        },
        "/api/weather/current": {
            get: {
                summary: "Get current weather for a location",
                tags: ["Weather"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "lat",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Latitude of the location",
                    },
                    {
                        name: "lon",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Longitude of the location",
                    },
                ],
                responses: {
                    "200": { description: "Current weather data" },
                    "400": { description: "Missing latitude or longitude" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/weather/hourly": {
            get: {
                summary: "Get hourly forecast for the next 48 hours",
                tags: ["Weather"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "lat",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Latitude of the location",
                    },
                    {
                        name: "lon",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Longitude of the location",
                    },
                ],
                responses: {
                    "200": { description: "Hourly forecast data" },
                    "400": { description: "Missing latitude or longitude" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/weather/daily": {
            get: {
                summary: "Get daily forecast for the next 7 days",
                tags: ["Weather"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "lat",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Latitude of the location",
                    },
                    {
                        name: "lon",
                        in: "query",
                        required: true,
                        schema: { type: "number" },
                        description: "Longitude of the location",
                    },
                ],
                responses: {
                    "200": { description: "Daily forecast data" },
                    "400": { description: "Missing latitude or longitude" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/alerts": {
            post: {
                summary: "Create a custom weather alert",
                tags: ["Alerts"],
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["locationId", "type", "condition", "threshold"],
                                properties: {
                                    locationId: {
                                        type: "string",
                                        example: "60d0fe4f5311236168a109ca",
                                    },
                                    type: {
                                        type: "string",
                                        enum: ["temperature", "wind", "humidity"],
                                        example: "temperature",
                                    },
                                    condition: {
                                        type: "string",
                                        enum: ["gt", "lt", "eq"],
                                        example: "gt",
                                    },
                                    threshold: { type: "number", example: 35 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": { description: "Custom alert created successfully" },
                    "400": { description: "Bad request" },
                },
            },
            get: {
                summary: "Get all custom alerts for the authenticated user",
                tags: ["Alerts"],
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": { description: "List of user's custom alerts" },
                    "401": { description: "Unauthorized" },
                },
            },
        },
        "/api/alerts/{id}": {
            delete: {
                summary: "Delete a custom alert by ID",
                tags: ["Alerts"],
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Custom alert ID",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": { description: "Custom alert deleted successfully" },
                    "404": { description: "Alert not found" },
                },
            },
        },
        "/api/alerts/test": {
            get: {
                summary: "Trigger a test severe weather alert via WebSocket",
                tags: ["Alerts"],
                responses: {
                    "200": {
                        description: "Test severe weather alert sent via WebSocket",
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
    },
    security: [{ bearerAuth: [] }],
};
