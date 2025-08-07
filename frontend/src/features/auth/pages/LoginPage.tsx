import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { loginUser, registerUser } from '../../../lib/api/authApi';
import type { AuthFormData } from '../components/LoginForm'; // if needed
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../../../utils/toast';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false);

    const handleRegister = async (data: { username: string; password: string }) => {
        try {
            await registerUser(data.username, data.password);
            showSuccess('Successfully registered user!');
            setShowRegister(false); // switch back to login after register
        } catch (error) {
            console.error('Register Error:', error);
            showError('Registration failed.');
        }
    };

    const handleLogin = async (data: AuthFormData) => {
        try {
            const response = await loginUser(data.username, data.password);

            const token = response.result.token; // adjust depende sa structure ng response
            const user = response.result.user.username;
            if (token) {
                localStorage.setItem('accessToken', token); // save token here
                localStorage.setItem('user', user);
            }

            showSuccess('Successfully logged in user!');
            navigate("/dashboard");
        } catch (error) {
            console.error('Login Error:', error);
            showError('Login failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center">
                    {showRegister ? 'Register' : 'Login'}
                </h1>

                {showRegister ? (
                    <RegisterForm onRegister={handleRegister} />
                ) : (
                    <LoginForm onSubmit={handleLogin} />
                )}

                <div className="text-center">
                    <button
                        className="btn btn-link no-underline"
                        onClick={() => setShowRegister((prev) => !prev)}
                    >
                        {showRegister
                            ? 'Already have an account? Login here'
                            : "Don't have an account? Register here"}
                    </button>
                </div>
            </div>
        </div>
    );
}
