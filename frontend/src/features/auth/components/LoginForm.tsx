import React, { useState, type ChangeEvent, type FormEvent } from 'react'

interface AuthFormProps {
    onSubmit: (data: AuthFormData) => void;
}

export interface AuthFormData {
    username: string;
    password: string;
}

export default function LoginForm({ onSubmit }: AuthFormProps) {
    const [formData, setFormData] = useState<AuthFormData>({
        username: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
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

            <button type="submit" className="btn btn-primary w-full mt-2">
                Login
            </button>
        </form>
    )
}
