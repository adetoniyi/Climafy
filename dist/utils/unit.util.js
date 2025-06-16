"use strict";
/**
 * Utility functions for handling unit conversions
 * in the Climafy Weather API project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPressure = exports.convertWindSpeed = exports.convertTemperature = void 0;
// Convert temperature to Celsius or Fahrenheit
const convertTemperature = (kelvin, unit) => {
    if (unit === "metric") {
        return +(kelvin - 273.15).toFixed(2); // Celsius
    }
    else if (unit === "imperial") {
        return +(((kelvin - 273.15) * 9) / 5 + 32).toFixed(2); // Fahrenheit
    }
    return kelvin; // Default Kelvin
};
exports.convertTemperature = convertTemperature;
// Convert wind speed to m/s or mph
const convertWindSpeed = (speed, unit) => {
    if (unit === "imperial") {
        return +(speed * 2.237).toFixed(2); // m/s to mph
    }
    return +speed.toFixed(2); // metric: m/s (no change)
};
exports.convertWindSpeed = convertWindSpeed;
// Convert pressure to hPa or other units if needed (default hPa)
const convertPressure = (pressure, unit) => {
    // For now, pressure remains in hPa for both systems
    return pressure;
};
exports.convertPressure = convertPressure;
