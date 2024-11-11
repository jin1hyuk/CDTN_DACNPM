import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
