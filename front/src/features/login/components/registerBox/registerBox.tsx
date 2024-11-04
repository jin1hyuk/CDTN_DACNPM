import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './registerBox.css';

const RegisterBox: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        try {
            const response = await axios.post('YOUR_API_URL/register', {
                name,
                email,
                password,
            });

            if (response.data.success) {
                setMessage('Đăng ký thành công!');
                // Có thể điều hướng đến trang đăng nhập sau khi đăng ký thành công
                navigate('/login');
            } else {
                setMessage(response.data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setMessage('Tài khoản đã tồn tại hoặc xảy ra lỗi');
            } else {
                setMessage('Đã xảy ra lỗi, vui lòng thử lại');
            }
        }
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
                    <Link to="/login" className="login-link-text">Login</Link> {/* Sử dụng Link */}
                </div>
            </div>
        </div>
    );
};

export default RegisterBox;
