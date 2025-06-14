"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/location.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
//Utility to wrap async route handlers and forward errors to Express error handler.
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Manage user locations
 */
/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Add a new location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, latitude, longitude]
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Location added
 */
router.post("/locations", asyncHandler(auth_middleware_1.authenticate), location_controller_1.addLocation);
/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all saved locations
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of locations
 */
router.get("/locations", asyncHandler(auth_middleware_1.authenticate), location_controller_1.getLocations);
/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a saved location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted
 */
router.delete("/locations/:id", asyncHandler(auth_middleware_1.authenticate), asyncHandler(location_controller_1.deleteLocation));
exports.default = router;
