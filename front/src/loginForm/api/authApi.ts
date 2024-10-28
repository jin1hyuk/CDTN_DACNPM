import axios from 'axios';

const API_URL = 'https://localhost:7204/Auth';

export const signin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error("Đăng nhập thất bại:", error);
        return null;
    }
};