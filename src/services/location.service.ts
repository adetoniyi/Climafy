import Location, { ILocation } from "../models/location.model";
import { Types } from "mongoose";

export const addLocation = async (
  userId: string,
  name: string,
  latitude: number,
  longitude: number
): Promise<ILocation> => {
  const location = new Location({ user: userId, name, latitude, longitude });
  return await location.save();
};

export const getUserLocations = async (
  userId: string
): Promise<ILocation[]> => {
  return await Location.find({ user: userId });
};

export const updateLocation = async (
  locationId: string,
  userId: string,
  data: Partial<ILocation>
): Promise<ILocation | null> => {
  return await Location.findOneAndUpdate(
    { _id: locationId, user: userId },
    data,
    { new: true }
  );
};

export const deleteLocation = async (
  locationId: string,
  userId: string
): Promise<ILocation | null> => {
  return await Location.findOneAndDelete({ _id: locationId, user: userId });
};
