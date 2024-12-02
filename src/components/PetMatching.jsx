import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import petImage from "../assets/images/dog-faces.jpg"; // Replace with actual placeholder image
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
  const [currentPet, setCurrentPet] = useState(null);

  // Fetch the next pet recommendation
  const fetchNextPet = () => {
    if (!backendApi) return;
    try {
      backendApi.matching.matchingRecommendationNextGet((error, data, response) => {
        if (error) {
          console.error("Error fetching next pet recommendation:", error);
          setCurrentRecommendation(null);
          setCurrentPet(null);
        } else if (data && data.payload) {
          console.log("Fetched pet recommendation:", data);
          setCurrentRecommendation(data.payload);
          // Now, make a second call to retrieve pet profile using data.petId
          backendApi.pet.petGetProfilePetIdGet(data.payload.petId, (petError, petData, petResponse) => {
            if (petError) {
              console.error("Error fetching pet profile:", petError);
              setCurrentPet(null);
            } else if(petData && petData.payload) {
              console.log("Fetched pet profile:", petData.payload);
              setCurrentPet(petData.payload);
            } else {
              console.error("Incorrect response for pet profile: ", petData);
              setCurrentRecommendation(null);
              setCurrentPet(null);
            }
          });
        } else {
          console.error("Incorrect response for pet recommendation: ", data);
          setCurrentRecommendation(null);
          setCurrentPet(null);
        }
      });
    } catch (error) {
      console.error("Error fetching next pet recommendation:", error);
      setCurrentRecommendation(null);
      setCurrentPet(null);
    }
  };

  // Fetch the first pet recommendation when the component mounts
  useEffect(() => {
    if (backendApi) {
      fetchNextPet();
    }
  }, [backendApi]);

  const handlePreference = async (preferenceChecked) => {
    if (!currentRecommendation || !backendApi) return;

    if (preferenceChecked) {
      // User accepted the recommendation
      try {
        backendApi.matching.matchingRecommendationIdAcceptPut(currentRecommendation.id, (error, data, response) => {
          if (error) {
            console.error("Error accepting recommendation:", error);
          } else {
            console.log("Recommendation accepted successfully:", data);
          }
          // Fetch the next pet recommendation after handling the current one
        });
        fetchNextPet();
      } catch (error) {
        console.error("Error accepting recommendation:", error);
        // Still fetch the next pet even if there's an error
      }
    } else {
      try {
        backendApi.matching.matchingRecommendationIdRejectPut(currentRecommendation.id, (error, data, response) => {
          if (error) {
            console.error("Error rejecting recommendation:", error);
          } else {
            console.log("Recommendation rejected successfully:", data);
          }
          // Fetch the next pet recommendation after handling the current one
          fetchNextPet();
        });
      } catch (error) {
        console.error("Error accepting recommendation:", error);
        // Still fetch the next pet even if there's an error
      }
    }
  };

  return (
      <>
        <NavbarComponent />
        <Container className="text-center my-5 bigger-container">
          {currentPet ? (
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
                        src={Array.isArray(currentPet.images) && currentPet.images.length > 0 ? backendApi.imagePath(currentPet.images[0]) : ''}
                        alt="Pet"
                        roundedCircle
                        style={{width: "300px", height: "300px", margin: "0 60px"}}
                    />
                    <p className="mt-3" style={{fontSize: "2rem"}}>
                      {currentPet.name}
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
                        <p><strong>Pet Name:</strong> {currentPet.name}</p>
                        <p><strong>Pet Type:</strong> {currentPet.attributes ? currentPet.attributes.petType : ''}</p>
                        <p><strong>Breed:</strong> {currentPet.attributes ? currentPet.attributes.petBreed : ''}</p>
                        <p><strong>Gender:</strong> {currentPet.attributes ? currentPet.attributes.petGender : ''}</p>
                        <p><strong>Age:</strong> {currentPet.attributes ? currentPet.attributes.petAge : ''} years</p>
                      </Col>
                      <Col xs={12} sm={6}>
                        <p><strong>Color:</strong> {currentPet.attributes ? currentPet.petColor : ''}</p>
                        <p><strong>Size:</strong> {currentPet.attributes ? currentPet.petSize : ''}</p>
                        <p><strong>Active Level:</strong> {currentPet.attributes ? currentPet.petActiveLevel : ''}</p>
                        <p><strong>Living
                          Environment:</strong> {currentPet.attributes ? currentPet.petLivingEnvironment : ''}</p>
                        <p><strong>Social
                          Condition:</strong> {currentPet.attributes ? currentPet.petSocialCondition : ''}
                        </p>
                        <p><strong>Behavioral
                          Challenges:</strong> {currentPet.attributes ? currentPet.petBehavioralChallenges : ''}</p>
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
