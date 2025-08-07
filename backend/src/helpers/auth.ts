import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';``
import 'dotenv/config';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)

    } catch (error) {
        console.error(`Error hashing password: ${error}`);
        throw new Error('Failed to hash password');
    }
}


export const comparePassword = async (password: string, hashedPasswod: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPasswod);
    } catch (error) {
        console.error(`Error comparing passwords: ${error}`);
        throw new Error('Error comparing password!');
    }
}


export const generateToken = (userid: number): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if(!JWT_SECRET) throw new Error('JWT_SECRET is not defined!');

    return jwt.sign({id: userid}, JWT_SECRET, {
        expiresIn: '1h'
    });
}