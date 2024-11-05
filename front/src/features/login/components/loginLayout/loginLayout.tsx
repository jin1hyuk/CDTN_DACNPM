import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginLayout.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Dữ liệu giả
    const users = [
        { email: "user1@example.com", password: "password123", fullName: "Nguyễn Văn A" },
        { email: "user2@example.com", password: "password456", fullName: "Trần Thị B" },
        { email: "admin@example.com", password: "admin123", fullName: "Quản Trị Viên" }
    ];

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Chuyển hướng đến trang chính khi đăng nhập thành công
            navigate('/home');
        } else {
            setError('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-container">
            <div className="info">
                <div className="infoContainer">
                    <h1 className="title">DigiForum.IO</h1>
                    <p className="description">Any discussion, anywhere, with anyone, only at DigiForum.io</p>
                    <div className="card">
                        <h3 className="cardTitle">Front-end Development</h3>
                        <p className="cardText">The three main languages you need to know well are HTML, CSS, and JavaScript.</p>
                    </div>
                </div>
            </div>
            <div className="loginForm">
                <div className="formContainer">
                    <h2 className="formTitle">Login</h2>{error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
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
                        <div className="options">
                            <label><input type="checkbox" /> Remember me</label>
<a href="#" onClick={handleForgotPassword} className="link">Forgot Password?</a>
                        </div>
                        <button type="submit" className="loginbut">Login</button>
                    </form>
                    <div className="createAccount">
                        Don’t have an account? <Link to="/register" className="link">Create one!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;