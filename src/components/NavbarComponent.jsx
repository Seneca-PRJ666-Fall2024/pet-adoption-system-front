import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavbarComponent = () => {
  // Access login state and logout function
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout, clearing authentication state and redirecting to home
  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Navbar Brand and Home link */}
        <Navbar.Brand href="/">Pet Adoption Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link>
            {/* Display links specific to adopters */}
            {userRole === "adopter" && (
              <>
                <Nav.Link as={Link} to="/matching">
                  Pet Matching
                </Nav.Link>

                <Nav.Link as={Link} to="/adoption">
                  My Adoptions
                </Nav.Link>
              </>
            )}
            {/* Display links specific to shelters */}
            {userRole === "shelter" && (
              <>
                <Nav.Link as={Link} to="/PetManagementMain">
                  Pet Management
                </Nav.Link>
                <Nav.Link as={Link} to="/adoption">
                  Adoption Management
                </Nav.Link>
              </>
            )}
            {/* Display login/logout options based on authentication state */}
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/ProfileSetup">
                  Update Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                {/* Links to login and register pages */}
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
