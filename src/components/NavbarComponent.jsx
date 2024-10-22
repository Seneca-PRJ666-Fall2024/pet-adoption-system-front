import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


const NavbarComponent = ({ userRole, logout }) => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">Pet Adoption Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#support">Support</Nav.Link>
            <Nav.Link href="#contacts">Contacts</Nav.Link>
            {userRole === 'guest' ? (
              <>
                <Nav.Link href="#register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>  {/* Use Link for navigation */}
              </>
            ) : (
              <Nav.Link href="#logout" onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
