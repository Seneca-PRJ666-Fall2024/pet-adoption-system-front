import React, { useContext, useEffect, useState } from "react";
import { Container, Modal, Nav, Row } from "react-bootstrap";
import PetCard from "./PetCard";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { initBackendApi } from "./BackendApi";

const AdopterView = () => {
  // Access authentication context
  const { token, logout, userName } = useContext(AuthContext);

  // State for backend API instance, recommendations, and attribute groups
  const [backendApi, setBackendApi] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [attributeGroups, setAttributeGroups] = useState([]);

  // Initialize backend API when the token changes
  useEffect(() => {
    if (token) {
      const apiInstance = initBackendApi(token, (res) => {
        if (res.status === 403) {
          logout(); // Handle unauthorized access
        }
      });
      setBackendApi(apiInstance);
    }
  }, [token]);

  // Fetch pet recommendations and attribute groups
  useEffect(() => {
    if (backendApi && token) {
      try {
        backendApi.matching.matchingRecommendationNextGet(
          { num: 3 },
          (error, data, response) => {
            if (error) {
              console.error("Error fetching next pet recommendation:", error);
            } else if (data && Array.isArray(data.payload)) {
              console.log("Fetched pet recommendation:", data);
              setRecommendations(data.payload);
            } else {
              console.error(
                "Incorrect response for pet recommendation: ",
                data
              );
              setRecommendations(null);
            }
          }
        );
        loadAttributeGroups(); // Load additional attribute data
      } catch (error) {
        console.error("Error fetching next pet recommendation:", error);
        setRecommendations(null);
      }
    }
  }, [backendApi, token]);

  // Fetch attribute groups from the API
  const loadAttributeGroups = async () => {
    try {
      await new Promise((resolve, reject) => {
        backendApi.pet.petAttributesGet((error, data, response) => {
          if (error) {
            reject(error); // Handle API errors
          } else {
            setAttributeGroups(data.payload);
            resolve(data); // Successfully fetched data
          }
        });
      });

      console.log("Attribute groups loaded successfully.");
    } catch (error) {
      console.error("API call failed:", error.message);
    }
  };

  return (
    <>
      {/* Welcome message with user's name */}
      <Container className="text-center mt-4">
        <h1>Welcome{userName ? ", " + userName : ""}!</h1>
      </Container>

      {/* Pet recommendations section */}
      <Container className="mt-4">
        <h3>Checkout available pet's status:</h3>
        <Row className="mt-4 text-center">
          {recommendations &&
            recommendations
              .filter((r) => r && r.pet)
              .map((rec) => (
                <PetCard
                  key={rec.pet.petId}
                  pet={rec.pet}
                  imageSrc={
                    rec.pet.imageUrl
                      ? backendApi.imagePath(rec.pet.imageUrl)
                      : ""
                  }
                  attributeGroups={attributeGroups}
                />
              ))}
        </Row>
      </Container>

      {/* Links to other sections */}
      <Container className="mt-4">
        <h4>Adoption process status:</h4>
        <p>
          You didn’t submit any application yet.{" "}
          <Nav.Link as={Link} to="/adoption" className="d-inline">
            Start here
          </Nav.Link>
          .
        </p>
        <h4>Find your match:</h4>
        <p>
          Please click{" "}
          <Nav.Link as={Link} to="/matching" className="d-inline">
            here
          </Nav.Link>
          .
        </p>
        <h4>Your profile:</h4>
        <p>
          <Nav.Link as={Link} to="/ProfileSetup" className="d-inline">
            Click here to review or update your profile
          </Nav.Link>
          .
        </p>
      </Container>
    </>
  );
};

export default AdopterView;
