import express from "express";
import { getAllUsers, login, logout, register } from "../controllers/userController.js";
import auth from "../middleware/auth.js";


const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/users", getAllUsers);

export default userRouter;
