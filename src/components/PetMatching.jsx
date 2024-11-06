import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import petImage from '../assets/images/dog-faces.jpg'; // replace with actual image path
// import mainImage from './assets/images/matching.png'; // replace with actual image path
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome component
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const PetMatching = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarComponent userRole="adopter" />

      {/* Welcome Section */}
      <Container className="text-center my-4">
        <h1>Welcome, Jessie! </h1>
        {/* <Image src={} alt="Main Pet Image" fluid className="my-4" style={{ maxWidth: '100%', borderRadius: '8px' }} /> */}
      </Container>

      {/* Available Pets Carousel */}
       <Container className="text-center my-5">
            <h3>Available pets you might like:</h3>
            <Row className="align-items-center justify-content-center mt-4">
            <Col xs="auto" style={{ color: '#1e6262' }}>
                    <span className="mx-2">No</span>
                    <FontAwesomeIcon 
                        icon={faChevronLeft} 
                        size="3x" 
                        className="text-secondary"
                        style={{ cursor: 'pointer', color: '#1e6262' }} 
                    />
                </Col>
                <Col xs="auto">
                    <Image src={petImage} alt="Pet" roundedCircle style={{ width: '200px', height: '200px' }} />
                    <p className="mt-3" style={{ fontSize: '1.25rem' }}>View pet’s profile</p>
                </Col>
                <Col xs="auto" style={{ color: '#1e6262' }}>
                    <FontAwesomeIcon 
                        icon={faChevronRight} 
                        size="3x" 
                        className="text-secondary" 
                        style={{ cursor: 'pointer', color: '#1e6262' }} 
                    />
                    <span className="mx-2">Yes</span>
                </Col>
            </Row>
        </Container>

      {/* Additional Info Section */}
      <Container className="mt-5">
        <h4>Adoption application status:</h4>
        <p>You didn’t submit any application yet.</p>

        <h4>Your adopter profile:</h4>
        <p>
          <a href="#profile">Click here to review or update your profile and preferences.</a>
        </p>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </>
  );
};

export default PetMatching;
