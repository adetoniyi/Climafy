/**
 * Utility functions for handling unit conversions
 * in the Climafy Weather API project.
 */

// Convert temperature to Celsius or Fahrenheit
export const convertTemperature = (
  kelvin: number,
  unit: "metric" | "imperial"
): number => {
  if (unit === "metric") {
    return +(kelvin - 273.15).toFixed(2); // Celsius
  } else if (unit === "imperial") {
    return +(((kelvin - 273.15) * 9) / 5 + 32).toFixed(2); // Fahrenheit
  }
  return kelvin; // Default Kelvin
};

// Convert wind speed to m/s or mph
export const convertWindSpeed = (
  speed: number,
  unit: "metric" | "imperial"
): number => {
  if (unit === "imperial") {
    return +(speed * 2.237).toFixed(2); // m/s to mph
  }
  return +speed.toFixed(2); // metric: m/s (no change)
};

// Convert pressure to hPa or other units if needed (default hPa)
export const convertPressure = (
  pressure: number,
  unit: "metric" | "imperial"
): number => {
  // For now, pressure remains in hPa for both systems
  return pressure;
};
