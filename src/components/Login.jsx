import React, { useState } from 'react';
import styles from "../styles/Register.module.css"; // Use the same CSS as Register
import { Link } from 'react-router-dom';
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication and role-based login
    const users = [
      { email: 'adopter@example.com', password: 'password123', role: 'adopter' },
      { email: 'shelter@example.com', password: 'password123', role: 'shelter' },
    ];

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      console.log(`Logged in as ${user.role}`);
      // Redirect or handle successful login
    } else {
      setError('Invalid email or password');
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

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}

            <button type="submit" className={styles.mybtn}>Sign in</button>
          </form>
        </div>

        <div className={styles.signin}>
          <p>
            Not registered yet? <span><Link to="/register">Join us by clicking here</Link></span>
          </p>
        </div>
      </div>
      {/* Footer */}
      <FooterComponent />
    </>
  );
}

export default Login;
