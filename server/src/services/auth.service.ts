import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RegisterDto, LoginDto } from "../dto/auth.dto.js";
import { findUserByEmail, createUser, listUsers } from "../repositories/user.repository.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

 export const registerUser = async (data: RegisterDto) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  const id = await createUser(data.name, data.email, hashed,"user");
  return { id };
};

 export const loginUser = async (data: LoginDto) => {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };
};

export const fetchUsers = async () => {
  const users = await listUsers();
  if (!users) throw new Error("Invalid credentials");

  return users;
};


