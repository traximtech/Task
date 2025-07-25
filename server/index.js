import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

await connectDB();

// user authentication routes
app.use("/api/user", userRouter);

// tasks routes
app.use("/api/task", taskRouter)

app.get("/", (req, res) => {
  res.send("server is running correctly");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
