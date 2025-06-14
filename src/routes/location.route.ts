import { Router } from "express";
import {
  addLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller";
import authenticate from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: User Location Management
 */

/**
 * @swagger
 * /location:
 *   post:
 *     summary: Add a new location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Location added successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authenticate, addLocation);

/**
 * @swagger
 * /location:
 *   get:
 *     summary: Get all user locations
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user locations
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getLocations);

/**
 * @swagger
 * /location/{id}:
 *   put:
 *     summary: Update a specific location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       404:
 *         description: Location not found
 */
router.put("/:id", authenticate, updateLocation);

/**
 * @swagger
 * /location/{id}:
 *   delete:
 *     summary: Delete a specific location
 *     tags: [Location]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
router.delete("/:id", authenticate, deleteLocation);

export default router;
