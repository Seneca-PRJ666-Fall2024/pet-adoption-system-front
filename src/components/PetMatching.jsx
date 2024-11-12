import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import petImage from "../assets/images/dog-faces.jpg"; // replace with actual image path
import mainImage from "../assets/images/matching.png"; // replace with actual image path
import "../styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome component
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const PetMatching = () => {
  return (
    <>
      {/* Navbar */}
      <NavbarComponent userRole="adopter" />

      {/* Welcome Section */}
      <Container className="text-center my-2">
        <h1 className="pt-3">Welcome, Jessie!</h1>
        <Image
          src={mainImage}
          alt="Main Pet Image"
          fluid
          className="my-2"
          style={{ maxWidth: "80%", borderRadius: "8px" }}
        />
      </Container>

      {/* Available Pets Carousel */}
      <Container className="text-center my-5 bigger-container">
        <h2>Available pets you might like:</h2>
        <Row className="align-items-center justify-content-center mt-4 bigger-row">
          <Col xs="auto" style={{ color: "#1e6262" }}>
            <span className="mx-4" style={{ fontSize: "3rem", position: 'relative', top: '-30px' }}>
              No
            </span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="7x"
              style={{ cursor: "pointer", color: "#1e6262", marginRight: "40px" }} // Add more margin to the right of the left arrow
            />
          </Col>
          <Col xs="auto">
            <Image
              src={petImage}
              alt="Pet"
              roundedCircle
              style={{ width: "300px", height: "300px", margin: "0 60px" }} // Add margin on left and right of the pet image
            />
            <p className="mt-3" style={{ fontSize: "2rem" }}>
              <a href="#profile">View pet’s profile </a>
            </p>
          </Col>
          <Col xs="auto" style={{ color: "#1e6262" }}>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="7x"
              style={{ cursor: "pointer", color: "#1e6262", marginLeft: "40px" }} // Add more margin to the left of the right arrow
            />
            <span className="mx-4" style={{ fontSize: "3rem", position: 'relative', top: '-30px' }}>
              Yes
            </span>
          </Col>
        </Row>
      </Container>

      {/* Additional Info Section */}
      <Container className="mt-5">
        <h4>Adoption application status:</h4>
        <p>You didn’t submit any application yet.</p>

        <h4>Your adopter profile:</h4>
        <p>
          <a href="#profile">
            Click here to review or update your profile and preferences.
          </a>
        </p>
      </Container>

      {/* Footer */}
      <FooterComponent />
    </>
  );
};

export default PetMatching;
