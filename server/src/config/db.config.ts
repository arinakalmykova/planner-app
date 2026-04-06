import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

sqlite3.verbose();

const dbPath = path.join(__dirname, "../../data/db.sqlite");
console.log("Database path:", dbPath); 

const db = new sqlite3.Database(dbPath, function(err: Error | null) {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to database");
});

db.serialize(() => {
  (db.run(
    `
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT,
            role TEXT
        )
        `,
    (err) => {
      if (err) console.log("error:", err);
      console.log("Table users created success");
    },
  ),
    db.run(
      `
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            dueDate TEXT, 
            priority TEXT,
            isCompleted INTEGER,
            userId INTEGER,
            createdAt TEXT,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
        `,
      (err) => {
        if (err) console.log("error:", err);
        console.log("Table tasks created success");
      },
    ));
});


db.serialize(async () => {
  db.get(`SELECT * FROM users WHERE role = 'admin'`, async (err, row) => {
    if (err) {
      console.log("Ошибка при проверке админа:", err);
      return;
    }

    if (!row) {
      console.log("Админ не найден, создаю...");

      const hashedPassword = await bcrypt.hash("admin123", 10);

      db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        ["Admin", "admin@example.com", hashedPassword, "admin"],
        (err) => {
          if (err) {
            console.log("Ошибка создания админа:", err);
          } else {
            console.log("Админ создан: admin@example.com / admin123");
          }
        }
      );
    } else {
      console.log("Админ уже существует");
    }
  });
});

export default db;
