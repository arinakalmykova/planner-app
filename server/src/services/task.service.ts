import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
} from "../repositories/task.repository.js";

import type { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto.js";

export const createTaskService = async (dto: CreateTaskDto, userId: number) => {
  return await createTask(dto.title, dto.description, dto.dueDate, userId);
};

export const getTasksService = async (userId: number) => {
  return await getTasksByUser(userId);
};

export const updateTaskService = async (
  id: number,
  dto: UpdateTaskDto,
  userId: number
) => {
  const task = await getTaskById(id);
  if (!task) throw new Error("Task not found");

  if (task.userId !== userId) {
    throw new Error("Forbidden");
  }

  await updateTask(
    id,
    dto.title ?? task.title,
    dto.description ?? task.description,
    dto.dueDate ?? task.dueDate,
    dto.isCompleted ? 1 : 0
  );
};

export const deleteTaskService = async (id: number, userId: number) => {
  const task = await getTaskById(id);
  if (!task) throw new Error("Task not found");

  if (task.userId !== userId) {
    throw new Error("Forbidden");
  }

  await deleteTask(id);
};