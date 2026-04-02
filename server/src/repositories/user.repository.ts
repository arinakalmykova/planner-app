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

export const createUser = (email: string, hashedPassword: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hashedPassword],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};