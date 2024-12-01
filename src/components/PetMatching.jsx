import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import petImage from "../assets/images/dog-faces.jpg"; // Replace with actual placeholder image
import "../styles/Home.css";

const PetMatching = () => {
  const userPKID = 1; // Replace with actual user PK ID
  const [petProfiles, setPetProfiles] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  // Fetch matched pet profiles
  useEffect(() => {
    const fetchPetProfiles = async () => {
      try {
        // Simulated backend response
        const response = [
          {
            petPKID: 101,
            adoptionStatus: false,
            preferenceChecked: null,
            petName: "Buddy",
            petGender: "Male",
            petType: "Dog",
            petBreed: "Poodle",
            petColor: "White",
            petSize: "Medium",
            petActiveLevel: "High",
            petLivingEnvironment: "Indoor",
            petSocialCondition: "Good with other pets",
            petBehavioralChallenges: "Occasional barking",
            petAge: 2.5,
          },
          {
            petPKID: 102,
            adoptionStatus: false,
            preferenceChecked: null,
            petName: "Bella",
            petGender: "Female",
            petType: "Cat",
            petBreed: "American Bobtail",
            petColor: "Brown",
            petSize: "Small",
            petActiveLevel: "Moderate",
            petLivingEnvironment: "Indoor",
            petSocialCondition: "Prefers solitude",
            petBehavioralChallenges: "Timid",
            petAge: 3.0,
          },
        ];
        setPetProfiles(response);
      } catch (error) {
        console.error("Error fetching pet profiles:", error);
      }
    };

    fetchPetProfiles();
  }, []);

  const handlePreference = async (preferenceChecked) => {
    const currentPet = petProfiles[currentPetIndex];
    const payload = {
      userPKID,
      petPKID: currentPet.petPKID,
      preferenceChecked,
    };

    try {
      const response = await fetch("http://localhost:8080/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Preference saved successfully.");
        // Remove the current pet from the list and move to the next pet
        setPetProfiles((prevProfiles) => {
          const updatedProfiles = prevProfiles.filter((_, index) => index !== currentPetIndex);
          if (updatedProfiles.length === 0) {
            setCurrentPetIndex(0);
          } else if (currentPetIndex >= updatedProfiles.length) {
            setCurrentPetIndex(updatedProfiles.length - 1);
          }
          return updatedProfiles;
        });
      } else {
        console.error("Failed to save preference.");
      }
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  if (!petProfiles.length) {
    return (
      <Container className="text-center my-5">
        <h3>No more pets to review.</h3>
      </Container>
    );
  }

  const currentPet = petProfiles[currentPetIndex];

  return (
    <>
      <NavbarComponent/>

      {/* Available Pets Carousel */}
      <Container className="text-center my-5 bigger-container">
        <h2>Available pets you might like:</h2>
        <Row className="align-items-center justify-content-center mt-4 bigger-row">
          <Col xs="auto" style={{ color: "#1e6262" }}>
            <span
              className="mx-4"
              style={{ fontSize: "3rem", position: "relative", top: "-30px", cursor: "pointer" }}
              onClick={() => handlePreference(false)} // Handle "No" preference
            >
              No
            </span>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="7x"
              style={{ cursor: "pointer", color: "#1e6262", marginRight: "40px" }}
              onClick={() =>
                setCurrentPetIndex(
                  (prevIndex) => (prevIndex - 1 + petProfiles.length) % petProfiles.length
                )
              }
            />
          </Col>
          <Col xs="auto">
            <Image
              src={petImage} // Replace with currentPet.image if available
              alt="Pet"
              roundedCircle
              style={{ width: "300px", height: "300px", margin: "0 60px" }}
            />
            <p className="mt-3" style={{ fontSize: "2rem" }}>
              {currentPet.petName}
            </p>
          </Col>
          <Col xs="auto" style={{ color: "#1e6262" }}>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="7x"
              style={{ cursor: "pointer", color: "#1e6262", marginLeft: "40px" }}
              onClick={() =>
                setCurrentPetIndex((prevIndex) => (prevIndex + 1) % petProfiles.length)
              }
            />
            <span
              className="mx-4"
              style={{ fontSize: "3rem", position: "relative", top: "-30px", cursor: "pointer" }}
              onClick={() => handlePreference(true)} // Handle "Yes" preference
            >
              Yes
            </span>
          </Col>
        </Row>
      </Container>

      {/* Pet Profile Section */}
      <Container className="my-5">
        <h3 className="text-center">Pet Profile</h3>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <Col xs={12} sm={6}>
                <p><strong>Pet Name:</strong> {currentPet.petName}</p>
                <p><strong>Pet Type:</strong> {currentPet.petType}</p>
                <p><strong>Breed:</strong> {currentPet.petBreed}</p>
                <p><strong>Gender:</strong> {currentPet.petGender}</p>
                <p><strong>Age:</strong> {currentPet.petAge} years</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Color:</strong> {currentPet.petColor}</p>
                <p><strong>Size:</strong> {currentPet.petSize}</p>
                <p><strong>Active Level:</strong> {currentPet.petActiveLevel}</p>
                <p><strong>Living Environment:</strong> {currentPet.petLivingEnvironment}</p>
                <p><strong>Social Condition:</strong> {currentPet.petSocialCondition}</p>
                <p><strong>Behavioral Challenges:</strong> {currentPet.petBehavioralChallenges}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

         {/* Additional Info Section */}
         <Container className="mt-5">
        <h4>Your Adoption application:</h4>
        <a href="/adoption">
            Click here to check your submitted adoption application.
          </a>

        <h4 className='mt-4'>Your adopter profile:</h4>
        <p className='mb-5'>
          <a href="profilesetup">
            Click here to review or update your profile and preferences.
          </a>
        </p>
      </Container>

      <FooterComponent />
    </>
  );
};

export default PetMatching;
