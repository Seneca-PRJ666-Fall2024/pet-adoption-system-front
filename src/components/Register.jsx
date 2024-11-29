import React, { useState } from 'react';
import styles from "../styles/Register.module.css";
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';  // Import NavbarComponent
import { initBackendApi } from './BackendApi';

function Register() {

  const backendApi = initBackendApi();

    // Step 1: Set up state to store the selected user type
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Step 2: Function to handle user selection change
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update state with the selected value
  };

  // Handle username and password inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
  };

  // Step 3: Function to handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!username || !password || !userType) {
      setError('All fields are required.');
      return;
    }

    // Prepare the request payload
    const userRegisterPostRequest = {
      email: username,
      password: password,
      role: userType === 'adopter' ? 'Pet Adopter' : 'Pet Shelter',
    };

    try {
      // Call the API
      const response = await new Promise((resolve, reject) => {
        backendApi.user.userRegisterPost(userRegisterPostRequest, (error, data, response) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      // Handle success
      setSuccess('Registration successful! You can now log in.');
      setError('');
      setUsername('');
      setPassword('');
      setUserType('');
    } catch (apiError) {
      // Handle error
      setError(apiError.message || 'An error occurred during registration.');
      setSuccess('');
    }
  };


  return (
    <>
    {/* Navbar */}
    <NavbarComponent userRole="guest" />
    <div className={styles.register}>
      <div className={styles.title}>
        <h1>Create your account</h1>
      </div>

      <div className={styles.regform}>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.question} htmlFor="userType">
              Are you an adopter or shelter?
            </label>
            <br/>
            <select
                id="userType"
                className="form-select mb-3"
                value={userType} // Set the value to state
                onChange={handleUserTypeChange} // Update state on change
                style={{
                  backgroundColor: "#ecfffb",
                  borderRadius: "5px",
                  border: "1px solid #1e6262",
                  color: "#1e6262"
                }}
            >
              <option value="" disabled>
                Please Choose...
              </option>
              <option value="adopter">Adopter</option>
              <option value="shelter">Shelter</option>
            </select>
          </div>

          <div className={styles.username}>
            <label className={styles.question}>Email:</label>
            <input
                type="text"
                className={styles.input}
                name="username"
                value={username}
                onChange={handleInputChange}
            />
          </div>
          <br/>

          <div className={styles.username}>
            <label className={styles.question}>Password:</label>
            <input
                type="password"
                className={styles.input}
                name="password"
                value={password}
                onChange={handleInputChange}
            />
          </div>
          <br/>


          <button type="submit" className={styles.mybtn}>Register</button>
        </form>

        {/* Error and Success Messages */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
      </div>

      <div className={styles.signin}>
        <p>
          Already a member? Sign in <span><Link to="/login">here.</Link></span>
        </p>
      </div>
    </div>
      {/* Footer */}
      <FooterComponent/>
    </>
  );
}

export default Register;
