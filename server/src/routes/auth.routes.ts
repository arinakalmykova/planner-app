import express from "express";
import {register, login, users} from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login',  login);
authRouter.get('/users',  users);

