import express from "express";
import * as locationController from "../controllers/location.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
 *     summary: Add a new location for the user
 *     tags: [Locations]
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
 *                 example: Home
 *               latitude:
 *                 type: number
 *                 example: 6.5244
 *               longitude:
 *                 type: number
 *                 example: 3.3792
 *     responses:
 *       201:
 *         description: Location added successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", asyncHandler(authenticate), locationController.createLocation);

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations for the authenticated user
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 */
router.get("/", asyncHandler(authenticate), locationController.getLocations);

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location by ID
 *     tags: [Locations]
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
 *                 example: Work
 *               latitude:
 *                 type: number
 *                 example: 6.6000
 *               longitude:
 *                 type: number
 *                 example: 3.4000
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       404:
 *         description: Location not found
 */
router.put(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(locationController.editLocation)
);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     tags: [Locations]
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
router.delete(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(locationController.removeLocation)
);

export default router;
