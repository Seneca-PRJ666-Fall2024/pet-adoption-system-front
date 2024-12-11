import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Home.css";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import PetMatching from "./components/PetMatching";
import Register from "./components/Register";
import ProfileSetup from "./components/ProfileSetup";
import AdoptionManagement from "./components/AdoptionManagement";
import PetManagementMain from "./components/PetManagementMain";
import Support from "./components/Support";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/matching" element={<PetMatching />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ProfileSetup" element={<ProfileSetup />} />
          <Route path="/adoption" element={<AdoptionManagement />} />
          <Route path="/PetManagementMain" element={<PetManagementMain />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
