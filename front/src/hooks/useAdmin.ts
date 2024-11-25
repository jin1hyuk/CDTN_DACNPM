import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import apiUser from "../api/apiUser";

const useAdmin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          navigate("/login"); // Redirect to login if no token
          return;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]); // Dependency on `navigate` to ensure it's available

  useEffect(() => {
    new Promise(async () => {
      const res = await apiUser.getMe();
      if (res.roles === 1) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    });
  }, []);

  return { isLoggedIn, loading };
};

export default useAdmin;
