import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const requireSignIn = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: 'No toke provided' });

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,

        ) as { id: number };

        (req as any).user = { id: decoded.id };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token!' });
    }
};