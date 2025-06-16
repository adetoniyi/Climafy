import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const preferences = await userService.getUserPreferences(userId);
    res.status(200).json(preferences);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const updatedPreferences = await userService.updateUserPreferences(
      userId,
      req.body
    );
    res.status(200).json(updatedPreferences);
  } catch (error) {
    next(error);
  }
};
