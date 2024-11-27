import React, { useState, useContext } from "react";
import styles from "../styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";
import { initBackendApi } from "./BackendApi";
import AuthContext from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const backendApi = initBackendApi();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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
      // Call the backend login API
      const response = await new Promise((resolve, reject) => {
        backendApi.userLoginPost(loginRequest, (error, data, response) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      // Call login function from context to update global state
      login(response.token);

      setLoading(false);

      // Redirect based on role (mock example, adapt as needed)
      // TODO: Update to a correct page: navigate(response.role === 'adopter' ? '/adopter-dashboard' : '/shelter-dashboard');
      navigate("/");
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
      <NavbarComponent userRole="guest" />
      <div className={styles.register}>
        <div className={styles.title}>
          <h1>Login to your account</h1>
        </div>

        <div className={styles.regform}>
          <form onSubmit={handleLogin}>
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
