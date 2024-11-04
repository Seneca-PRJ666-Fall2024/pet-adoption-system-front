import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/Home.css';  // Import CSS for Home component
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProfileSetup from './components/ProfileSetup';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        {/* <Route 
          path="/login" 
          element={userRole ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
        /> */}
        <Route 
          path="/" 
          element={<Home userRole={userRole} />}  // Always render Home as landing page
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ProfileSetup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
};

export default App;
