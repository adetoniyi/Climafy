import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Climafy MongoDB connected");
  } catch (error) {
    console.error("Climafy MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
