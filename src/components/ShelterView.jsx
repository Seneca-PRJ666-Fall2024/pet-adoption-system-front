import React from 'react';
import {Container, Nav, Row} from 'react-bootstrap';
import PetCard from './PetCard';
import {Link} from "react-router-dom";
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
                  <PetCard imageSrc='{catImage}' status="adopted"/>
                  <PetCard imageSrc='{dogImage}' status="available"/>
                  <PetCard imageSrc='{hamsterImage}' status="available"/>
              </Row>
          </Container>

          <Container className="mt-4">
              <h4>Adoption applications:</h4>
              <p>You didn’t receive any new applications yet.  <Nav.Link as={Link} to="/adoption" className="d-inline">View details</Nav.Link>.</p>
              <h4>Register new pet:</h4>
              <p>Fill out the new pet registration form <Nav.Link as={Link} to="/PetManagementMain" className="d-inline">here</Nav.Link>.</p>
              <h4>Your shelter profile:</h4>
              <p><Nav.Link as={Link} to="/ProfileSetup" className="d-inline">Click here to review or update your profile</Nav.Link>.</p>
          </Container>
      </>
  );
};

export default ShelterView;
