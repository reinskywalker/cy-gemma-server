import mongoose, { Document, Model, Schema } from "mongoose";

export interface KeyDocument extends Document {
  apikey: string;
  hit: number;
}

const KeySchema: Schema = new Schema<KeyDocument>({
  apikey: {
    type: String,
    required: [true, "Please provide the API key"],
    unique: true,
  },
  hit: {
    type: Number,
    default: 0,
  },
});

const Key: Model<KeyDocument> =
  mongoose.models.keys || mongoose.model<KeyDocument>("keys", KeySchema);

export default Key;
