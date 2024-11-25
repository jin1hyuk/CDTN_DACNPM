import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner while checking
  }

  if (!isLoggedIn) {
    navigate("/login"); // Redirect to login if not logged in
    return null; // Do not render any children while redirecting
  }

  return <>{children}</>; // Render children if the user is logged in
};

export default AuthWrapper;
