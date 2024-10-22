import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';  // Assuming you'll have a separate CSS file for footer styles

const FooterComponent = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col><a href="#support">Support</a></Col>
          <Col><a href="#legal">Legal</a></Col>
          <Col><a href="#terms">Terms and Conditions</a></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
