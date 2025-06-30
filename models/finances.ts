// const mongoose = require('mongoose');
import * as mongoose from "mongoose";

const financesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  secretKey: {
    type: String,
    required: true,
  },
});

export type Model = mongoose.InferSchemaType<typeof financesSchema>;
export const Model = mongoose.model("Finances", financesSchema, "Finances");
