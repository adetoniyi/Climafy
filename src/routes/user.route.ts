import express from "express";
import * as userController from "../controllers/user.controller";
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
 *   name: Users
 *   description: User preferences management
 */

/**
 * @swagger
 * /api/users/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unit:
 *                   type: string
 *                   example: metric
 *                 severeAlerts:
 *                   type: boolean
 *                   example: true
 *                 customAlerts:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/preferences",
  asyncHandler(authenticate),
  userController.getPreferences
);

/**
 * @swagger
 * /api/users/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unit:
 *                 type: string
 *                 enum: [metric, imperial]
 *                 example: imperial
 *               severeAlerts:
 *                 type: boolean
 *                 example: false
 *               customAlerts:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User preferences updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/preferences",
  asyncHandler(authenticate),
  userController.updatePreferences
);

export default router;
