import axios from "axios";
import { broadcastSevereAlert } from "../utils/websocket.utils";
import Alert, { IAlert } from "../models/alert.model";

export const createCustomAlert = async (
  userId: string,
  locationId: string,
  type: "temperature" | "wind" | "humidity",
  condition: "gt" | "lt" | "eq",
  threshold: number
): Promise<IAlert> => {
  const alert = new Alert({
    user: userId,
    location: locationId,
    type,
    condition,
    threshold,
  });
  return await alert.save();
};

export const getUserAlerts = async (userId: string): Promise<IAlert[]> => {
  return await Alert.find({ user: userId }).populate("location");
};

export const deleteCustomAlert = async (
  alertId: string,
  userId: string
): Promise<IAlert | null> => {
  return await Alert.findOneAndDelete({ _id: alertId, user: userId });
};

export const fetchSevereWeatherAlerts = async (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
  const { data } = await axios.get(url);

  const weatherData = data as { alerts?: any[] };

  if (weatherData.alerts && weatherData.alerts.length > 0) {
    weatherData.alerts.forEach((alert: any) => {
      broadcastSevereAlert(
        `Severe Alert: ${alert.event} - ${alert.description}`
      );
    });
  }
};
