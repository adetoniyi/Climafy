import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  preferences: {
    unit: "metric" | "imperial";
    severeAlerts: boolean;
    customAlerts: boolean;
  };
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    preferences: {
      unit: { type: String, enum: ["metric", "imperial"], default: "metric" },
      severeAlerts: { type: Boolean, default: true },
      customAlerts: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
