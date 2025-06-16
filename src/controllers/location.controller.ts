import { Request, Response, NextFunction } from "express";
import * as locationService from "../services/location.service";

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id; // non-null assertion
    const { name, latitude, longitude } = req.body;

    const location = await locationService.addLocation(
      userId,
      name,
      latitude,
      longitude
    );
    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id; // non-null assertion
    const locations = await locationService.getUserLocations(userId);
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

export const editLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.id;
    const userId = req.user!.id; // non-null assertion
    const { name, latitude, longitude } = req.body;

    const updatedLocation = await locationService.updateLocation(
      userId,
      locationId,
      { name, latitude, longitude }
    );

    if (!updatedLocation)
      return res.status(404).json({ message: "Location not found" });

    res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

export const removeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.id;
    const userId = req.user!.id;

    const deletedLocation = await locationService.deleteLocation(
      userId,
      locationId
    );
    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    next(error);
  }
};
