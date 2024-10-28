import { useState } from 'react';
import './registerBox.css'

const RegisterBox = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }
        console.log('Đăng ký thành công!', { name, email, password });
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div className='registerBox'>
            <h2>Đăng Ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Đăng Ký</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterBox;
