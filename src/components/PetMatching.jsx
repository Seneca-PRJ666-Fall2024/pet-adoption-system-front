import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Container, Row, Col, Image, Card, Modal, Button} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import { initBackendApi } from './BackendApi';
import AuthContext from "../context/AuthContext";

const PetMatching = () => {

  const { token } = useContext(AuthContext);

  const [backendApi, setBackendApi] = useState(null);
  useEffect(() => {
    if (token) {
      const apiInstance = initBackendApi(token);
      setBackendApi(apiInstance);
    }
  }, [token]);

  const [currentRecommendation, setCurrentRecommendation] = useState(null);

  // Fetch the first pet recommendation when the component mounts
  useEffect(() => {
    if (backendApi) {
      try {
        backendApi.matching.matchingRecommendationNextGet({},(error, data, response) => {
          if (error) {
            console.error("Error fetching next pet recommendation:", error);
            setCurrentRecommendation(null);
          } else if (data && Array.isArray(data.payload)) {
            console.log("Fetched pet recommendation:", data);
            if(data.payload.length > 0){
              setCurrentRecommendation(data.payload[0]);
            } else {
              setCurrentRecommendation(null);
            }
          } else {
            console.error("Incorrect response for pet recommendation: ", data);
            setCurrentRecommendation(null);
          }
        });
      } catch (error) {
        console.error("Error fetching next pet recommendation:", error);
        setCurrentRecommendation(null);
      }
    }
  }, [backendApi]);

  const handlePreference = async (preferenceChecked) => {
    if (!currentRecommendation || !backendApi) return;

    const target = preferenceChecked ?
        (id, callback) => backendApi.matching.matchingRecommendationIdAcceptPut(id, callback) :
        (id, callback) => backendApi.matching.matchingRecommendationIdRejectPut(id, callback);

      try {
        target(currentRecommendation.id, (error, data, response) => {
          if (error) {
            console.error("Error processing recommendation:", error);
          } else if (data) {
            console.log("Recommendation processed successfully. Next recommendation:", data);
            setCurrentRecommendation(data.payload);
          } else {
            console.log("Recommendation processed successfully:", data);
          }
        });
      } catch (error) {
        console.error("Error processing recommendation:", error);
        // Still fetch the next pet even if there's an error
      }

  };

  return (
      <>
        <NavbarComponent />
        <Container className="text-center my-5 bigger-container">
          {currentRecommendation ? (
              // Render the main content
              <>
                <h2>Available pets you might like:</h2>
                <Row className="align-items-center justify-content-center mt-4 bigger-row">
                  <Col xs="auto" style={{color: "#1e6262"}}>
            <span
                className="mx-4"
                style={{fontSize: "3rem", position: "relative", top: "-30px", cursor: "pointer"}}
                onClick={() => handlePreference(false)} // Handle "No" preference
            >
              No
            </span>
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="7x"
                        style={{cursor: "pointer", color: "#1e6262", marginRight: "40px"}}
                        onClick={() => handlePreference(false)} // Handle "No" preference
                    />
                  </Col>
                  <Col xs="auto">
                    <Image
                        src={currentRecommendation.pet.imageUrl ? backendApi.imagePath(currentRecommendation.pet.imageUrl) : ''}
                        alt="Pet"
                        className="rounded-circle"
                        style={{width: "300px", height: "300px", margin: "0 60px", objectFit: "cover"}}
                    />
                    <p className="mt-3" style={{fontSize: "2rem"}}>
                      {currentRecommendation.pet.petName}
                    </p>
                  </Col>
                  <Col xs="auto" style={{color: "#1e6262"}}>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        size="7x"
                        style={{cursor: "pointer", color: "#1e6262", marginLeft: "40px"}}
                        onClick={() => handlePreference(true)}
                    />
                    <span
                        className="mx-4"
                        style={{fontSize: "3rem", position: "relative", top: "-30px", cursor: "pointer"}}
                        onClick={() => handlePreference(true)} // Handle "Yes" preference
                    >
              Yes
            </span>
                  </Col>
                </Row>

                <h3 className="text-center">Pet Profile</h3>
                <Card className="mt-4">
                  <Card.Body>
                    <Row>
                      <Col xs={12} sm={6}>
                        <p><strong>Pet Name:</strong> {currentRecommendation.pet.petName}</p>
                        <p><strong>Pet Type:</strong> {currentRecommendation.pet.petType}</p>
                        <p><strong>Breed:</strong> {currentRecommendation.pet.petBreed}</p>
                        <p><strong>Gender:</strong> {currentRecommendation.pet.petGender}</p>
                        <p><strong>Age:</strong> {currentRecommendation.pet.petAge} years</p>
                      </Col>
                      <Col xs={12} sm={6}>
                        <p><strong>Color:</strong> {currentRecommendation.pet.petColour}</p>
                        <p><strong>Size:</strong> {currentRecommendation.pet.petSize}</p>
                        <p><strong>Active Level:</strong> {currentRecommendation.pet.petActivityLevel}</p>
                        <p><strong>Living
                          Environment:</strong> {currentRecommendation.pet.petEnvironment}</p>
                        <p><strong>Social
                          Condition:</strong> {currentRecommendation.pet.petSocial}
                        </p>
                        <p><strong>Behavioral
                          Challenges:</strong> {currentRecommendation.pet.petBehavioralChallenges}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

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
              </>
          ) : (
              // Display message when no pets are available
              <h3>No more pets to review.</h3>

          )}
        </Container>
        <FooterComponent/>
      </>
  );
};

export default PetMatching;
