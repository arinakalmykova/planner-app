import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { taskRouter } from "./routes/task.routes.js";

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/tasks",taskRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
