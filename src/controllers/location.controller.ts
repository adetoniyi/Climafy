import { Request, Response } from "express";
import Location from "../models/location";

export const addLocation = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude } = req.body;
    const userId = (req as any).userId;

    const location = await Location.create({
      userId,
      name,
      latitude,
      longitude,
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: "Failed to add location", error });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const locations = await Location.find({ userId });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch locations", error });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const location = await Location.findOneAndDelete({ _id: id, userId });
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    res.json({ message: "Location deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete location", error });
  }
};
