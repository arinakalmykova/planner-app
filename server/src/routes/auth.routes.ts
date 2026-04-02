import express from "express";
import {register, login} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post('/register',  authMiddleware,register);
authRouter.post('/login',  authMiddleware,login);

