import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './registerBox.css';
import { users, User } from './userData';

const RegisterBox: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setMessage('Email đã tồn tại.');
            return;
        }

        // Add new user to shared users array
        users.push({ name, email, password });
        
        // Set success message
        setMessage('Đăng ký thành công! Chuyển hướng đến trang đăng nhập...');
        
        // Redirect to login after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 2000); // Delay of 2 seconds
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
