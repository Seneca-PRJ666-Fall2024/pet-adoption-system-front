import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { Container, Form, Button, Navbar, Nav, Row, Col } from 'react-bootstrap';
import '../styles/Login.css';
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';  // Import NavbarComponent
import { Link } from 'react-router-dom';



const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replaces useHistory

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication and role-based login
    const users = [
      { email: 'adopter@example.com', password: 'password123', role: 'adopter' },
      { email: 'shelter@example.com', password: 'password123', role: 'shelter' },
    ];

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Call the onLogin function passed as a prop to update the user role
      onLogin(user.role);
      // Redirect to the home page after login
      navigate('/'); // Replaces history.push('/')
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <>
        {/* Navbar */}
        <NavbarComponent userRole="guest" /> {/* Assuming the user is a guest on the login page */}
   
        {/* Login Form */}
        <Container className="d-flex justify-content-center align-items-center flex-column" style={{ height: '80vh' }}>
            <h2 className="text-center mb-4">Login with your credentials</h2>
            <div className="login-box p-4 rounded">
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="email" placeholder="ex. pet@gmail.com" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-2">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="ex. mypassword" />
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="w-50 mt-3">
                        Sign in
                    </Button>
                </div>
                </Form>
            </div>
            <p className="mt-3">
                Not registered yet? <Link to="/register">Join us by clicking here</Link>.
            </p>
            </Container>

        {/* Footer */}
        <FooterComponent />
    </>
  );
};

export default Login;
