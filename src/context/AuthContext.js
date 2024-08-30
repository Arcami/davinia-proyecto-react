import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if there is an auth token and user ID in localStorage
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");
    if (token && id) {
      setIsLoggedIn(true);
      setUserId(id);
    }
  }, []);

  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
