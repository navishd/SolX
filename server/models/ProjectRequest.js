import mongoose from "mongoose";

const projectRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  problemDescription: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  selectedPlan: { type: String, enum: ['Starter', 'Pro', 'Enterprise'], required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('ProjectRequest', projectRequestSchema);
