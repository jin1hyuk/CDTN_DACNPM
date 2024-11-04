import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './features/login/components/loginLayout/loginLayout';
import RegisterBox from './features/login/components/registerBox/registerBox';
import ForgotPasswordPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage';
import Home from './features/homepage/components/home';
import GoogleVerificationPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage'; // Import the new verification page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} /> {/* Main home page */}
                <Route path="/" element={<LoginPage />} /> {/* Login page */}
                <Route path="/login" element={<LoginPage />} /> {/* Redirected to the login page */}
                <Route path="/register" element={<RegisterBox />} /> {/* Registration page */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Forgot password page */}
                <Route path="/verify-code" element={<GoogleVerificationPage />} /> {/* Google verification page */}
            </Routes>
        </Router>
    );
}

export default App;
