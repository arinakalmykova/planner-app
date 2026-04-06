import type { Request, Response } from "express";
import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const id = await createTaskService(req.body, userId);
    res.status(201).json({ id });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const tasks = await getTasksService(userId,userRole);

    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    await updateTaskService(Number(req.params.id), req.body, userId, userRole);

    res.json({ message: "Updated" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const delTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    await deleteTaskService(Number(req.params.id), userId, userRole);

    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};