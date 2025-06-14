import { Router } from "express";
import {
  getUserPreferences,
  updateUserPreferences,
} from "../controllers/user.controller";
import authenticate from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Preferences Management
 */

/**
 * @swagger
 * /user/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences fetched
 *       401:
 *         description: Unauthorized
 */
router.get("/preferences", authenticate, getUserPreferences);

/**
 * @swagger
 * /user/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               units:
 *                 type: string
 *               notifications:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User preferences updated
 *       401:
 *         description: Unauthorized
 */
router.put("/preferences", authenticate, updateUserPreferences);

export default router;
