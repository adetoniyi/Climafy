import { Request, Response } from "express";
import { fetchSevereWeatherAlerts } from "../services/alert.service";
import { Alert } from "../models/alert";

// Extend Express Request interface to include 'user'
interface AuthenticatedRequest extends Request {
  user: { id: string };
}

export const getSevereAlerts = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const alerts = await fetchSevereWeatherAlerts(Number(lat), Number(lon));
    res.json(alerts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch severe weather alerts", error: err });
  }
};

export const createCustomAlert = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const alert = new Alert({ ...req.body, user: userId });
    await alert.save();
    res.status(201).json(alert);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create custom alert", error: err });
  }
};

export const getUserCustomAlerts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const alerts = await Alert.find({ user: req.user.id });
    res.json(alerts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch custom alerts", error: err });
  }
};

// TODO: Import or define 'signupSchema' before using it, for example:
// import { signupSchema } from '../schemas/signup.schema';
// or define it here if appropriate.

// const parsed = signupSchema.safeParse(req.body);
// if (!parsed.success) {
//   return res.status(400).json({ message: parsed.error.errors[0].message });
// }
