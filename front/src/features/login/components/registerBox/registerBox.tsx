import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './registerBox.css';

interface User {
    name: string;
    email: string;
    password: string;
}

const RegisterBox: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [tempUsers, setTempUsers] = useState<User[]>([]);  // Temporary storage array
    const navigate = useNavigate();

    // Function to push user data to MockAPI
    const saveUserToApi = async (user: User) => {
        try {
            const response = await fetch('https://672ede12229a881691f12947.mockapi.io/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setMessage('User registered successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setMessage('Failed to register user on API.');
            }
        } catch (error) {
            setMessage('An error occurred while saving to API.');
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Password confirmation does not match.');
            return;
        }

        // Check if email already exists in tempUsers
        const existingUser = tempUsers.find(user => user.email === email);
        if (existingUser) {
            setMessage('Email already exists in temporary storage.');
            return;
        }

        // Create new user and push to tempUsers
        const newUser = { name, email, password };
        const updatedTempUsers = [...tempUsers, newUser];
        setTempUsers(updatedTempUsers);  // Update state with new user

        // Push the new user to MockAPI
        saveUserToApi(newUser);
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
