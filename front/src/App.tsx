import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './features/login/components/loginLayout/loginLayout';
import RegisterBox from './features/login/components/registerBox/registerBox'; 
import ForgotPasswordPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage';
import Home from "./features/homepage/components/home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* Trang đăng nhập */}
                <Route path="/login" element={<LoginPage />} /> {/* Trang đăng nhập */}
                <Route path="/register" element={<RegisterBox />} /> {/* Trang đăng ký */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/home" element={<Home />} /> {/* Trang chính */}
            </Routes>
        </Router>
    );
}

export default App;
