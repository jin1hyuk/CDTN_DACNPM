import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './verifyCodeLayout.css';
import { users } from '../../../homeuser/components/userData';

const VerifyCodePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCodeVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Find the user with the matching email and verification code
        const userIndex = users.findIndex(user => user.email === email && user.verifyCode === code);

        if (userIndex !== -1) {
            if (newPassword === confirmPassword) {
                // Update the user's password
                users[userIndex].password = newPassword;
                setMessage('Password updated successfully! Redirecting to login...');
                
                // Add the user to the shared users array if not already there (optional)
                users.push({ name: users[userIndex].name, email, password: newPassword });

                setTimeout(() => {
                    navigate('/login'); // Route to login page
                }, 2000); // 2-second delay before redirecting
            } else {
                setError('Passwords do not match. Please try again.');
            }
        } else {
            setError('Invalid email or verification code. Please try again.');
        }
    };

    return (
        <div className="verify-container">
            <div className="formContainer">
                <h2 className="formTitle">Change password</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleCodeVerification}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        placeholder="Enter your verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <button type="submit" className="verifyBtn">Verify Code</button>
                </form>

                <div className="navigationLinks">
                    <Link to="/forgot-password" className="navLink">Back to Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;
