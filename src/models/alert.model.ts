import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  user: mongoose.Types.ObjectId;
  type: "temperature" | "humidity" | "windSpeed"; // Type of alert
  location: mongoose.Types.ObjectId; // Reference to the location
  condition: string; // Condition for the alert, e.g., "temperature > 30"
  threshold: number; // Threshold value for the alert
  triggered: boolean; // Whether the alert has been triggered
  notified?: boolean; // Whether the user has been notified
}

const alertSchema = new Schema<IAlert>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["temperature", "humidity", "windSpeed"],
      required: true,
    },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    condition: { type: String, required: true }, // e.g., "temperature > 30"
    threshold: { type: Number, required: true }, // e.g., 30 for temperature alerts
    notified: { type: Boolean, default: false }, // Whether the user has been notified
    triggered: { type: Boolean, default: false }, // Whether the alert has been triggered
  },
  { timestamps: true }
);

export const Alert = mongoose.model<IAlert>("Alert", alertSchema);
