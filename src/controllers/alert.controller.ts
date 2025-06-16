import { Request, Response, NextFunction } from "express";
import * as alertService from "../services/alert.service";

export const createAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const { locationId, type, condition, threshold } = req.body;

    const alert = await alertService.createCustomAlert(
      userId,
      locationId,
      type,
      condition,
      threshold
    );

    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

export const getAlerts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const alerts = await alertService.getUserAlerts(userId);
    res.status(200).json(alerts);
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const alertId = req.params.id;
    const userId = req.user!.id;
    const alert = await alertService.deleteCustomAlert(alertId, userId);

    if (!alert) return res.status(404).json({ message: "Alert not found" });
    res.status(200).json({ message: "Alert deleted" });
  } catch (error) {
    next(error);
  }
};
