import express from "express"
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.post("/add", createTask)
taskRouter.get("/getTasks", auth, getAllTasks)
taskRouter.get("/getTask/:id", auth, getSingleTask)
taskRouter.put("/updateTask/:id", auth, updateTask)
taskRouter.delete("/deleteTask/:id", auth, deleteTask)

export default taskRouter;