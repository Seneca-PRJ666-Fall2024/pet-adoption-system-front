import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PetCard from './PetCard';
// import catImage from '../assets/images/cat.jpg';
// import dogImage from '../assets/images/dog.jpg';
// import hamsterImage from '../assets/images/hamster.jpg';

const ShelterView = () => {
  return (
    <>
      <Container className="text-center mt-4">
        <h1>Welcome, Shelter Admin!</h1>
      </Container>

      <Container className="mt-4">
        <h3>Manage pets at your shelter:</h3>
        <Row className="mt-4 text-center">
          <PetCard imageSrc={catImage} status="adopted" />
          <PetCard imageSrc={dogImage} status="available" />
          <PetCard imageSrc={hamsterImage} status="available" />
        </Row>
      </Container>

      <Container className="mt-4">
        <h4>Adoption applications:</h4>
        <p>You didn’t receive any new applications yet. <a href="#adoption-process">View details</a>.</p>
        <h4>Register new pet:</h4>
        <p>Fill out the new pet registration form <a href="#registration-form">here</a>.</p>
        <h4>Your shelter profile:</h4>
        <p><a href="#profile">Click here to review or update your profile</a>.</p>
      </Container>
    </>
  );
};

export default ShelterView;
