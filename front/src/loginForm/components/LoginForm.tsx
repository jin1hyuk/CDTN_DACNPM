import React, { useState } from 'react';
import { signin } from '../api/authApi';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signin(email, password);

        if (result) {
            console.log("Đăng nhập thành công!");
            // Điều hướng hoặc xử lý sau khi đăng nhập
        } else {
            alert("Email hoặc mật khẩu không chính xác.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Mật khẩu:</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Đăng nhập</button>
        </form>
    );
};

export default LoginForm;
