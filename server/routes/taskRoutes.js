import express from "express"
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.post("/add", createTask)
taskRouter.get("/getTasks", auth, getAllTasks)
taskRouter.get("/getTask/:id", getSingleTask)
taskRouter.put("/updateTask/:id", updateTask)
taskRouter.delete("/deleteTask/:id", deleteTask)

export default taskRouter;