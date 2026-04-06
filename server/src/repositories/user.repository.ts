import db  from "../config/db.config.js";
import type { User } from "../entities/user.entity.js";

export const findUserByEmail = (email: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row:any) => {
      if (err) return reject(err);
      resolve(row ?? null);
    });
  });
};

export const createUser = (name: string, email: string, hashedPassword: string, role:string): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, email, password,role) VALUES (?, ?, ?,?)`,
      [name,email, hashedPassword,role],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};

export const listUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM users`,
      (err, rows: User[]) => {
        if (err) return reject(err);
        resolve(rows ?? []);
      }
    );
  });
};