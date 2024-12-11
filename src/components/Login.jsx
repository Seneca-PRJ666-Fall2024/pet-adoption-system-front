import React, { useState, useContext } from "react";
import styles from "../styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import { initBackendApi } from "./BackendApi";
import AuthContext from "../context/AuthContext";

function Login() {
  // State hooks for managing email, password, errors, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize backend API and context functions
  const backendApi = initBackendApi();
  const navigate = useNavigate();

  // Login function from context
  const { login } = useContext(AuthContext);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Indicate loading state

    // Prepare the request payload
    const loginRequest = {
      email: email,
      password: password,
    };

    try {
      // Make API request to login
      const response = await new Promise((resolve, reject) => {
        backendApi.user.userLoginPost(loginRequest, (error, data, response) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      setLoading(false);

      // Check response and handle successful login
      if (
        response &&
        response.payload &&
        response.payload.token &&
        response.payload.role
      ) {
        // Call login function from context to update global state
        login(
          response.payload.token,
          response.payload.role,
          response.payload.username
        );

        navigate(response.payload.profileSet ? "/" : "/ProfileSetup");
      } else {
        console.error("Login failed. Invalid response: ", response);
      }
    } catch (apiError) {
      // Handle errors from the backend
      console.error("Login failed", apiError);
      setError(apiError.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />
      <div className={styles.register}>
        <div className={styles.title}>
          <h1>Login to your account</h1>
        </div>

        <div className={styles.regform}>
          <form onSubmit={handleLogin}>
            {/* Input fields for email and password */}
            <div className={styles.username}>
              <label className={styles.question}>Email:</label>
              <input
                type="email"
                className={styles.input}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className={styles.username}>
              <label className={styles.question}>Password:</label>
              <input
                type="password"
                className={styles.input}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Display error if any */}
            {loading && <p>Loading...</p>} {/* Display loading indicator */}
            <button type="submit" className={styles.mybtn}>
              Sign in
            </button>
          </form>
        </div>

        {/* Link to registration page */}
        <div className={styles.signin}>
          <p>
            Not registered yet?{" "}
            <span>
              <Link to="/register">Join us by clicking here</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <FooterComponent />
    </>
  );
}

export default Login;
