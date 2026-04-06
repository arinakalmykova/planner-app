import type {Request, Response} from "express";
import {registerUser, loginUser, fetchUsers} from "../services/auth.service.js";

export const register = async (req:Request, res:Response) =>  {
    try{
        const result = await registerUser(req.body);
        res.status(201).json(result)
    }
    catch (err:any) {
        res.status(400).json({message: err.message});
    }
}

export const login = async (req:Request, res:Response) =>  {
    try{
        const result = await loginUser(req.body);
        res.json(result);
    }
    catch (err:any) {
        res.status(400).json({message: err.message});
    }
}

export const users = async (req:Request, res:Response) =>  {
    try{
        const data = await fetchUsers();
        res.json(data);
    }
    catch (err:any) {
        res.status(400).json({message: err.message});
    }
}