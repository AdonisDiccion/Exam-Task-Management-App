import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, generateToken, hashPassword } from "../helpers/auth";
import { loginUserService, registerUserService } from "../services/authService";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const result = await registerUserService(username, password);

        res.status(201).json({
            message: 'Successfully created new user!',
            result
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: `Failed registering new user! ${error}` });
        return;
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const result = await loginUserService(username, password);

        res.status(200).json({
            message: 'Successfully logged-in user',
            result
        })

    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({ message: `Failed logging in user! ${error}` });
        return;
    }
}