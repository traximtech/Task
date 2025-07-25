import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["todo" ,"in-progress" , "done"],
      default: "todo",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt:  { type: Date, default: Date.now()},
    updatedAt:  { type: Date, default: Date.now()},
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
