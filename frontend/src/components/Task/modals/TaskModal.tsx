import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

export type RegisterModalHandle = {
    open: () => void;
};

type RegisterModalProps = {
    onSubmit: (data: { name: string; email: string; password: string }) => void;
};

export const RegisterModal = forwardRef<RegisterModalHandle, RegisterModalProps>(
    ({ onSubmit }, ref) => {
        const modalRef = useRef<HTMLDialogElement | null>(null);

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
        });

        // Expose `open()` to parent
        useImperativeHandle(ref, () => ({
            open: () => modalRef.current?.showModal(),
        }));

        const close = () => modalRef.current?.close();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };

        const handleRegister = () => {
            const { name, email, password } = formData;

            if (name && email && password) {
                onSubmit(formData);
                setFormData({ name: '', email: '', password: '' });
                close();
            }
        };

        return (
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Register Account</h3>

                    <div className="space-y-4 mt-4">
                        <fieldset className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                                value={formData.email}
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
                    </div>

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            <button className="btn">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        );
    }
);
