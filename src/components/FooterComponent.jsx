import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// FooterComponent: A reusable footer section with navigation links.
const FooterComponent = () => {
  return (
    <footer className="custom-footer py-3">
      <Container className="d-flex justify-content-around">
        <Link to="/support" className="text-decoration-none">
          Support
        </Link>
        <Link to="/privacy" className="text-decoration-none">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-decoration-none">
          Terms and Conditions
        </Link>
      </Container>
    </footer>
  );
};

export default FooterComponent;
