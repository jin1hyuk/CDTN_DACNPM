import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './features/login/components/loginLayout/loginLayout';
import RegisterBox from './features/login/components/registerBox/registerBox'; // Ensure correct import
import ForgotPasswordPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage';

function App() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterBox />} /> {/* Ensure this route is correct */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
        </Router>
    );
}

export default App;
