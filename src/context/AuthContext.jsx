import React, { createContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("guest"); // Add userRole to the context
  const [userName, setUserName] = useState("guest");

  useEffect(() => {
    // Check if a token exists in localStorage when the app loads
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole"); // Retrieve the stored role
    const storedName = localStorage.getItem("userName");
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedRole);
      setUserName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken, role, userName) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userRole", role); // Store the role
    localStorage.setItem("userName", userName);
    setToken(newToken);
    setUserRole(role);
    setUserName(userName);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setToken(null);
    setUserRole("guest");
    setUserName("guest");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userRole, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
