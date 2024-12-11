import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext to manage authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [token, setToken] = useState(null); // Stores the authentication token
  const [userRole, setUserRole] = useState("guest"); // Stores the user's role
  const [userName, setUserName] = useState("guest"); // Stores the user's name

  useEffect(() => {
    // Load authentication data from localStorage on app load
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedRole);
      setUserName(storedName);
      setIsLoggedIn(true);
    }
  }, []); // Runs only once on component mount

  const login = (newToken, role, userName) => {
    // Save authentication data to localStorage and update state
    localStorage.setItem("token", newToken);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", userName);
    setToken(newToken);
    setUserRole(role);
    setUserName(userName);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Clear authentication data from localStorage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setToken(null);
    setUserRole("guest");
    setUserName("guest");
    setIsLoggedIn(false);
  };

  // Provide authentication state and functions to child components
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, userRole, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
