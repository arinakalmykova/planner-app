import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks
} from "../repositories/task.repository.js";

import type { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto.js";

export const createTaskService = async (dto: CreateTaskDto, userId: number) => {
  return await createTask(dto.title, dto.description, dto.dueDate, dto.priority, userId);
};

export const getTasksService = async (userId: number, role:string) => {
  if (role === "admin") {
    return await getAllTasks();
  }
  return await getTasksByUser(userId);
};

export const updateTaskService = async (
  id: number,
  dto: UpdateTaskDto,
  userId: number, 
  userRole:string
) => {
  const task = await getTaskById(id);
  if (!task) throw new Error("Task not found");
  if (userRole !== "admin" && task.userId !== userId) {
    throw new Error("Forbidden");
  }

  await updateTask(
    id,
    dto.title ?? task.title,
    dto.description ?? task.description,
    dto.dueDate ?? task.dueDate,
    dto.priority ?? task.priority,
    dto.isCompleted ? 1 : 0
  );
};

export const deleteTaskService = async (id: number, userId: number, userRole:string) => {
  const task = await getTaskById(id);
  if (!task) throw new Error("Task not found");
  if (userRole !== "admin" && task.userId !== userId) {
    throw new Error("Forbidden");
  }

  await deleteTask(id);
};