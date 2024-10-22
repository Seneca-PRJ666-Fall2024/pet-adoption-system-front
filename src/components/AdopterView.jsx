import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from './PetCard';
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
          <PetCard imageSrc={catImage} status="adopted" />
          <PetCard imageSrc={dogImage} status="available" />
          <PetCard imageSrc={hamsterImage} status="available" />
        </Row>
      </Container>

      <Container className="mt-4">
        <h4>Adoption process status:</h4>
        <p>You didn’t submit any application yet. <a href="#adoption-process">Start here</a>.</p>
        <h4>Find your match:</h4>
        <p>Please click <a href="#pet-matching">here</a>.</p>
        <h4>Your profile:</h4>
        <p><a href="#profile">Click here to review or update your profile</a>.</p>
      </Container>
    </>
  );
};

export default AdopterView;
