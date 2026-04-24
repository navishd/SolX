import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  demoLink: { type: String }
}, { timestamps: true });

export default mongoose.model('Solution', solutionSchema);
