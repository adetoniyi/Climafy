import { Alert } from "../models/alert.model";
import { broadcastAlert } from "../utils/websocket.utils";

export const createCustomAlert = async (userId: string, alertData: any) => {
  return await Alert.create({ ...alertData, user: userId });
};

export const getUserAlerts = async (userId: string) => {
  return await Alert.find({ user: userId });
};

export const deleteAlert = async (alertId: string) => {
  return await Alert.findByIdAndDelete(alertId);
};

export const processSevereWeatherAlert = async (
  weatherData: any,
  userId: string
) => {
  if (
    weatherData.weather &&
    weatherData.weather.some((w: any) => w.id >= 200 && w.id < 600)
  ) {
    const message = `Severe weather alert: ${weatherData.weather[0].description}`;
    broadcastAlert({ userId, message });
    return message;
  }
  return null;
};
