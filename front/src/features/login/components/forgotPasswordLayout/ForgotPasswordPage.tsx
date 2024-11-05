import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './forgotPasswordLayout.css';
import { users } from '../registerBox/userData'; // Import the user data array

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            setMessage('Veryfi code have been sent .');

            // Redirect to GoogleVerificationLayout after a short delay
            setTimeout(() => {
                navigate('/verify-code'); // Route to verification page
            }, 2000); // 2-second delay before redirecting
        } else {
            setError('No account found with this email.');
        }
    };

    return (
        <div className="forgot-container">
            <div className="formContainer">
                <h2 className="formTitle">Forgot Password</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

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
