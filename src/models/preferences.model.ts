export interface IPreferences {
  units: {
    temperature: "C" | "F";
    windSpeed: "m/s" | "km/h";
  };
  notifications: boolean;
}
