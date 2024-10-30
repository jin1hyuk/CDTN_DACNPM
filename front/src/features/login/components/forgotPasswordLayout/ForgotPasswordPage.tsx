import React, { useState } from 'react';
import './forgotPasswordLayout.css';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset logic here, e.g., API call
        setMessage('If an account with this email exists, a reset link has been sent.');
    };

    return (
        <div className="container">
            <div className="formContainer">
                <h2 className="formTitle">Forgot Password</h2>
                {message && <p className="message">{message}</p>}
                
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
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
