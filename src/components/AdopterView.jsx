import React from 'react';
import {Container, Nav, Row} from 'react-bootstrap';
import PetCard from './PetCard';
import {Link} from "react-router-dom";
// import catImage from '../assets/images/cat.jpg';
// import dogImage from '../assets/images/dog.jpg';
// import hamsterImage from '../assets/images/hamster.jpg';

const AdopterView = () => {
  return (
    <>
      <Container className="text-center mt-4">
        <h1>Welcome, Jessie!</h1>
      </Container>

      <Container className="mt-4">
        <h3>Checkout available pet's status:</h3>
        <Row className="mt-4 text-center">
          <PetCard imageSrc='{catImage}' status="adopted" />
          <PetCard imageSrc='{dogImage}' status="available" />
          <PetCard imageSrc='{hamsterImage}' status="available" />
        </Row>
      </Container>

      <Container className="mt-4">
        <h4>Adoption process status:</h4>
        <p>You didn’t submit any application yet. <Nav.Link as={Link} to="/adoption" className="d-inline">Start here</Nav.Link>.</p>
        <h4>Find your match:</h4>
        <p>Please click <Nav.Link as={Link} to="/matching" className="d-inline">here</Nav.Link>.</p>
        <h4>Your profile:</h4>
        <p><Nav.Link as={Link} to="/ProfileSetup" className="d-inline">Click here to review or update your profile</Nav.Link>.</p>
      </Container>
    </>
  );
};

export default AdopterView;
