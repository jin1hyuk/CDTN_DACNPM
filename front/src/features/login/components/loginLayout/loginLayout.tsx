import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginLayout.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Fetch users from MockAPI
            const response = await fetch('https://672ede12229a881691f12947.mockapi.io/posts');
            const users = await response.json();
            
            // Check if the entered email and password match any user
            const user = users.find((user: { email: string, password: string }) => 
                user.email === email && user.password === password
            );

            if (user) {
                // Set success message and clear error
                setSuccessMessage('Login successful! Redirecting...');
                setError('');

                // Redirect after a short delay
                setTimeout(() => {
                    navigate('/homeuser');
                }, 2000); // Delay of 2 seconds
            } else {
                setError('Incorrect email or password. Please try again.');
                setSuccessMessage('');
            }
        } catch (err) {
            setError('An error occurred while connecting to the server. Please try again later.');
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
                    {successMessage && <p className="success">{successMessage}</p>}
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
