import dotenv from "dotenv";

dotenv.config();

export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY as string;
