import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import './forgotPasswordLayout.css';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // State to handle any errors

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('YOUR_API_URL/forgot-password', { email }); // Replace with your API URL
            if (response.data.success) {
                setMessage('If an account with this email exists, a reset link has been sent.');
            } else {
                setError(response.data.message || 'Failed to send reset link. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgot-container">
            <div className="formContainer">
                <h2 className="formTitle">Forgot Password</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

                <form onSubmit={handlePasswordReset}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <button type="submit" className="resetBtn">Send Reset Link</button>
                </form>

                {/* Navigation Links */}
                <div className="navigationLinks">
                    <Link to="/login" className="navLink">Back to Login</Link>
                    <span> | </span>
                    <Link to="/register" className="navLink">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
