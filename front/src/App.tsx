import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './features/login/components/loginLayout/loginLayout';
import RegisterBox from './features/login/components/registerBox/registerBox';
import ForgotPasswordPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage';
import Home from './features/homepage/components/home';
import HomeUser from './features/homeuser/components/homeuser';

import ManagerUser from './features/manageruser/components/manageruser';
import VerifyCodePage from './features/login/components/forgotPasswordLayout/VerifyCodePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Main home page */}
                <Route path="/login" element={<LoginPage />} /> {/* Login page */}
                <Route path='/homeuser' element={<HomeUser />} />
                <Route path='/manageruser' element={<ManagerUser />} />
                <Route path="/login" element={<LoginPage />} /> {/* Redirected to the login page */}
                <Route path="/register" element={<RegisterBox />} /> {/* Registration page */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Forgot password page */}
                <Route path="/verify-code" element={<VerifyCodePage />} /> {/* Google verification page */}
            </Routes>
        </Router>
    );
}

export default App;
