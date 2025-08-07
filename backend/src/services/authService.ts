import User from "../models/User";
import { comparePassword, generateToken, hashPassword } from "../helpers/auth";


// -- Register new user
export const registerUserService = async (username: string, password: string) => {
    if (!username || !password) {
        const error: any = new Error('Username and Password are required!');
        error.status = 400;
        throw error;
    }

    // Check if existed
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        const error: any = new Error('User already exists!');
        error.status = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        username,
        password: hashedPassword
    });

    const token = generateToken(newUser.userid);

    return {
        user: {
            userid: newUser.userid,
            username: newUser.username
        },
        token
    };
}


// -- Login user
export const loginUserService = async (username: string, password: string) => {
    // Validate input
    if (!username || !password) {
        const error: any = new Error('Username and Password are required!');
        error.status = 400;
        throw error;
    }

    // Check if not existed
    const user = await User.findOne({ where: { username } });
    if (!user) {
        const error: any = new Error('User does not exists!');
        error.status = 401;
        throw error;
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
        const error: any = new Error('Passwords does not matched!');
        error.status = 401;
        throw error;
    }

    const token = generateToken(user.userid);

    return {
        user: {
            userid: user.userid,
            username: user.username
        },
        token
    }
}