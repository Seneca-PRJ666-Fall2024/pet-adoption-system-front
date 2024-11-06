import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/Home.css';  // Import CSS for Home component
import Home from './components/Home';
import Login from './components/Login';
import PetMatching from './components/PetMatching';

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
        <Route path="/" element={<Home userRole={userRole} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/matching" element={<PetMatching />} />
      </Routes>
    </Router>
  );
};

export default App;
