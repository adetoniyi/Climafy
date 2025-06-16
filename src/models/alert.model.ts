import { Schema, model, Document, Types } from "mongoose";

export interface IAlert extends Document {
  user: Types.ObjectId;
  location: Types.ObjectId;
  type: "temperature" | "wind" | "humidity";
  condition: "gt" | "lt" | "eq"; // Greater than, Less than, Equal
  threshold: number;
  active: boolean;
}

const AlertSchema = new Schema<IAlert>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    type: {
      type: String,
      enum: ["temperature", "wind", "humidity"],
      required: true,
    },
    condition: { type: String, enum: ["gt", "lt", "eq"], required: true },
    threshold: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IAlert>("Alert", AlertSchema);
