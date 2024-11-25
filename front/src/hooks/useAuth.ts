import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const useAuth = () => {
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

        // Optionally, validate the token with an API call
        // const response = await fetch("https://api.example.com/auth/validate", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // if (response.ok) {
        //   setIsLoggedIn(true);
        // } else {
        //   setIsLoggedIn(false);
        //   navigate("/login"); // Redirect to login if token is invalid
        // }
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

  return { isLoggedIn, loading };
};

export default useAuth;
