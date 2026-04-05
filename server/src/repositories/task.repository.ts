import db from "../config/db.config.js";
import type { Task } from "../entities/task.entity.js";

export const createTask = (
  title: string,
  description: string,
  dueDate: string,
  priority:string,
  userId: number
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tasks (title, description, dueDate, priotity, isCompleted,  userId)
       VALUES (?, ?, ?, ?, 0, ?)`,
      [title, description, dueDate, priority, userId],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};

export const getTasksByUser = (userId: number): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM tasks WHERE userId = ?`,
      [userId],
      (err, rows:any) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

export const getTaskById = (id: number): Promise<Task | null> => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row:any) => {
      if (err) return reject(err);
      resolve(row ?? null);
    });
  });
};

export const updateTask = (
  id: number,
  title: string,
  description: string,
  dueDate: string,
  priority:string,
  isCompleted: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE tasks 
       SET title=?, description=?, dueDate=?, priority=?, isCompleted=?
       WHERE id=?`,
      [title, description, dueDate,priority, isCompleted, id],
      function (err) {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};

export const deleteTask = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
};