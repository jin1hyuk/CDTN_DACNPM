import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './features/login/components/loginLayout/loginLayout';
import RegisterBox from './features/login/components/registerBox/registerBox'; 
import ForgotPasswordPage from './features/login/components/forgotPasswordLayout/ForgotPasswordPage';
import Home from "./features/homepage/components/home";
import ProfilePage from './features/profile/pages/ProfilePage';
import PostDetail from './features/profile/components/PostDetail';

function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home />} /> {/* Home route */}
        //         <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        //         <Route path="/register" element={<RegisterBox />} /> {/* Registration route */}
        //         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        //     </Routes>
        // </Router>
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
