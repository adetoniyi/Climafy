import { Request, Response } from "express";
import { Preferences } from "../models/preferences";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}

export const updateUnits = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { temperature, windSpeed } = req.body;

    const preferences = await Preferences.findOneAndUpdate(
      { user: userId },
      { "units.temperature": temperature, "units.windSpeed": windSpeed },
      { new: true, upsert: true }
    );

    res.json(preferences);
  } catch (err) {
    res.status(400).json({ message: "Failed to update units", error: err });
  }
};

export const updateNotificationSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { email, sms, push } = req.body;

    const preferences = await Preferences.findOneAndUpdate(
      { user: userId },
      {
        "notifications.email": email,
        "notifications.sms": sms,
        "notifications.push": push,
      },
      { new: true, upsert: true }
    );

    res.json(preferences);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update notifications", error: err });
  }
};

export const getUserPreferences = async (req: Request, res: Response) => {
  try {
    const preferences = await Preferences.findOne({ user: req.user.id });
    res.json(preferences || {});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve preferences", error: err });
  }
};
