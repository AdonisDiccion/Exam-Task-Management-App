import React, { useState } from 'react';

interface RegisterFormProps {
    onRegister: (data: { username: string; password: string }) => void;
}


export default function RegisterForm({ onRegister }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(''); // Clear error on change
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Call the parent handler with only username and password
        onRegister({
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
            <fieldset className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    name="username"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </fieldset>

            <fieldset className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    name="password"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </fieldset>

            <fieldset className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input
                    name="confirmPassword"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </fieldset>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn btn-primary w-full">
                Register
            </button>
        </form>
    );
}
