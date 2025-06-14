import { Schema, model, Document, Types } from "mongoose";

export interface ILocation extends Document {
  user: Types.ObjectId;
  name: string; // e.g., "Home", "Work"
  latitude: number;
  longitude: number;
}

const LocationSchema = new Schema<ILocation>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<ILocation>("Location", LocationSchema);
