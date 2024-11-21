import React, { useState } from 'react';
import styles from "../styles/Register.module.css";
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';  // Import NavbarComponent

function Register() {
    // Step 1: Set up state to store the selected user type
  const [userType, setUserType] = useState('');

  // Step 2: Function to handle user selection change
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update state with the selected value
  };

  // Step 3: Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(userType); // Log the selected user type (can be sent to the backend)
    // You can send this data to your backend using fetch, axios, etc.
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
        <form>
          <div>
            <label className={styles.question} htmlFor="userType">
              Are you an adopter or shelter?
            </label>
            <br />
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
            <input type="text" className={styles.input} name="username"></input>
          </div>
          <br />

          <div className={styles.username}>
            <label className={styles.question}>Password:</label>
            <input type="text" className={styles.input} name="username"></input>
          </div>
          <br />


          <button type="submit" className={styles.mybtn}>Register</button>
        </form>
      </div>

      <div className={styles.signin}>
        <p>
          Already a member? Sign in <span><Link to="/login">here.</Link></span>
        </p>
      </div>
    </div>
    {/* Footer */}
    <FooterComponent />
    </>
  );
}

export default Register;
