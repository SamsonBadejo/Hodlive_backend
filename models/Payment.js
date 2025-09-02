import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // payer's name
  email: { type: String, required: true },
  amount: { type: Number, required: true }, // amount in kobo
  bank: { type: String, required: true },
  type: { type: String, enum: ["tithe", "offering"], required: true },
  reference: { type: String, required: true, unique: true },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", transactionSchema);
