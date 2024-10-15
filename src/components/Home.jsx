import React from 'react';
import { Button, Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import '../styles/Home.css';

const Home = () => {
  return (
    <div id="root">
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">Pet Adoption Platform</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#support">Support</Nav.Link>
              <Nav.Link href="#contacts">Contacts</Nav.Link>
              <Nav.Link href="#register">Register</Nav.Link>
              <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Wrapper */}
      <div className="main-content">
        {/* Welcome and Image Section */}
        <Container className="flex-grow-1 text-center mt-4">
          <h1>Welcome, Jessie!</h1>
          <img
            src="../assets/images/pets.jpg" // Update with your actual image path
            alt="Pets"
            className="img-fluid mt-4"
          />
        </Container>

        {/* Available Pets Section */}
        <Container className="mt-4">
          <h3>Review available pets status:</h3>
          <Row className="mt-4 text-center">
            {/* Pet Card 1 */}
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src="/assets/images/cat.jpg" />
                <Card.Body>
                  <Button variant="link">View pet’s profile</Button>
                  <Row>
                    <Col>
                      <Button variant="success">Adopted</Button>
                    </Col>
                    <Col>
                      <Button variant="outline-success">Still available</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Pet Card 2 */}
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src="/assets/images/dog.jpg" />
                <Card.Body>
                  <Button variant="link">View pet’s profile</Button>
                  <Row>
                    <Col>
                      <Button variant="success">Adopted</Button>
                    </Col>
                    <Col>
                      <Button variant="outline-success">Still available</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Pet Card 3 */}
            <Col md={4}>
              <Card className="mb-4 shadow-sm">
                <Card.Img variant="top" src="/assets/images/hamster.jpg" />
                <Card.Body>
                  <Button variant="link">View pet’s profile</Button>
                  <Row>
                    <Col>
                      <Button variant="success">Adopted</Button>
                    </Col>
                    <Col>
                      <Button variant="outline-success">Still available</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Additional Information Section */}
        <Container className="mt-4">
          <h4>Adoption applications:</h4>
          <p>You didn’t receive any new application yet.</p>

          <h4>Register new pet:</h4>
          <p>Please fill out the new pet registration form <a href="#registration-form">here</a>.</p>

          <h4>Your shelter profile:</h4>
          <p>
            <a href="#profile">Click here to review or update your profile</a>.
          </p>
        </Container>
      </div>

      {/* Footer */}
      <footer className="custom-footer">
        <Container>
          <Row>
            <Col>
              <a href="#support">Support</a>
            </Col>
            <Col>
              <a href="#legal">Legal</a>
            </Col>
            <Col>
              <a href="#terms">Terms and Conditions</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
