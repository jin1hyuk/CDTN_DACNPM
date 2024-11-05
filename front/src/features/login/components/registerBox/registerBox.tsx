import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './registerBox.css';

const RegisterBox: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Dữ liệu người dùng giả
    const users = [
        { name: "Nguyễn Văn A", email: "user1@example.com", password: "password123" },
        { name: "Trần Thị B", email: "user2@example.com", password: "password456" },
        { name: "Quản Trị Viên", email: "admin@example.com", password: "admin123" }
    ];

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        // Kiểm tra xem email đã tồn tại trong dữ liệu giả chưa
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setMessage('Email đã tồn tại.');
            return;
        }

        // Nếu không có lỗi, thêm người dùng mới vào dữ liệu giả (không thực sự lưu trữ)
        users.push({ name, email, password });
        setMessage('Đăng ký thành công!');

        // Chuyển hướng đến trang đăng nhập
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h2 className="form-title">Register</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <button type="submit" className="register-btn">Register</button>
                </form>
                <div className="login-link">
                    <span>Have an account? </span>
                    <Link to="/login" className="login-link-text">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterBox;