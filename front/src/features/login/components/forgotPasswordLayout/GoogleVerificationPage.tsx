import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import './googleVerificationLayout.css';

const GoogleVerificationPage: React.FC = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Replace with your actual verification API URL and logic
            const response = await axios.post('YOUR_API_URL/verify-code', { code });
            if (response.data.success) {
                setMessage('Code verified successfully! You can now reset your password.');
                setTimeout(() => {
                    navigate('/login'); // Redirect to the login page after a short delay
                }, 2000); // 2 seconds delay for the message to be read
            } else {
                setError(response.data.message || 'Invalid verification code. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while verifying the code. Please try again later.');
        }
    };

    return (
        <div className="verification-container">
            <div className="formContainer">
                <h2 className="formTitle">Enter Verification Code</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleCodeSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
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

export default GoogleVerificationPage;
