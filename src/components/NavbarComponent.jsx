import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavbarComponent = () => {
  // Access login state and logout function
  const { isLoggedIn, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">Pet Adoption Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link>
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
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/ProfileSetup">Update Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
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
