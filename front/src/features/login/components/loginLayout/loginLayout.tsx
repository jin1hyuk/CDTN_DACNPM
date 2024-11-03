import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './loginLayout.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.example.com/user-credentials', {
                params: { email }
            });

            if (response.data.exists) {
                setEmail(response.data.email);
                setPassword(response.data.password);
                setError('');
            } else {
                setError('Tài khoản không tồn tại');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.example.com/login', {
                email,
                password,
            });

            if (response.data.success) {
                // Navigate to HomeUser on successful login
                navigate('/home-user');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login.');
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
                    <h2 className="formTitle">Login</h2>
                    {error && <p className="error">{error}</p>}
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
