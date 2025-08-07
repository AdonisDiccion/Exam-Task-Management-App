import instance from "../axios";

interface LoginResponse {
  result: {
    token: string;
    user: {
        userid: number,
        username: string
    };
  };
}


export const registerUser = async (username: string, password: string): Promise<void> => {
    const { data } = await instance.post(`/auth/register`, {
        username,
        password,
    });

    return data;
};

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await instance.post(`/auth/login`, {
        username,
        password,
    });

    return response.data;
}