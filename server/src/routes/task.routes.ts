import express from "express";
import {show, create, update, delTask} from "../controllers/tasks.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
export const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, show );
taskRouter.post("/",  authMiddleware,create );
taskRouter.put("/:id", authMiddleware, update );
taskRouter.delete("/:id", authMiddleware, delTask);

