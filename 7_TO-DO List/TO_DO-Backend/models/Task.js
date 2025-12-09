import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    todo: { type: String, required: true },
    category: {
      type: String,
      enum: ["Personal", "Work", "Urgent", "Important"],
      default: "Personal",
    },
    isCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
