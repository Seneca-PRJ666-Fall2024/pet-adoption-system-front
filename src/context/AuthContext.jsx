import React, { createContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("guest"); // Add userRole to the context

  useEffect(() => {
    // Check if a token exists in localStorage when the app loads
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole"); // Retrieve the stored role
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedRole)
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken, role) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userRole", role); // Store the role
    setToken(newToken);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setUserRole("guest")
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
