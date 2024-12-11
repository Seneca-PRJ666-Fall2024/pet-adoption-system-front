import React, { useContext, useEffect, useState } from "react";
import { Container, Modal, Nav, Row } from "react-bootstrap";
import PetCard from "./PetCard";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { initBackendApi } from "./BackendApi";

// ShelterView component for managing shelter pets and adoptions
const ShelterView = () => {
  // Use the AuthContext to access user details and handle logout
  const { token, logout, userName } = useContext(AuthContext);

  // State to hold the backend API instance and shelter data
  const [backendApi, setBackendApi] = useState(null);
  const [shelterPets, setShelterPets] = useState([]);
  const [newAdoptions, setNewAdoptions] = useState(0);
  const [attributeGroups, setAttributeGroups] = useState([]);

  // Initialize backend API with authentication token
  useEffect(() => {
    if (token) {
      const apiInstance = initBackendApi(token, (res) => {
        if (res.status === 403) {
          logout();
        }
      });
      setBackendApi(apiInstance);
    }
  }, [token]); // Re-run when token changes

  // Fetch data for pets and adoption status when backendApi is set
  useEffect(() => {
    if (!backendApi) return;
    fetchAdoptions();
    loadAttributeGroups();
  }, [backendApi]); // Re-run when backendApi is available

  // Function to load pet attribute groups from the backend
  const loadAttributeGroups = async () => {
    try {
      await new Promise((resolve, reject) => {
        backendApi.pet.petAttributesGet((error, data, response) => {
          if (error) {
            reject(error);
          } else {
            setAttributeGroups(data.payload);
            resolve(data);
          }
        });
      });

      console.log("Attribute groups loaded successfully.");
    } catch (error) {
      console.error("API call failed:", error.message);
    }
  };

  // Function to fetch pet adoptions and shelter pets
  const fetchAdoptions = async () => {
    if (!backendApi) {
      console.error("Backend API is not initialized");
      return;
    }

    try {
      // Fetch pet profiles for shelter pets
      backendApi.pet.petGetProfileGet((error, data, response) => {
        if (error) {
          console.error("Error fetching next pet recommendation:", error);
          return;
        }

        if (data && Array.isArray(data.payload)) {
          setShelterPets(data.payload.slice(-3));
        } else {
          console.error("Incorrect response for pet recommendation: ", data);
        }
      });
      // Fetch adoption status and count new adoptions
      backendApi.adoption.adoptionStatusGet((error, data, response) => {
        if (error) {
          console.error("Error fetching adoptions:", error);
          return;
        }

        if (data && Array.isArray(data.payload)) {
          // Filter and count new adoptions with status
          setNewAdoptions(
            data.payload.filter(
              (item) => item.status && item.status.toLowerCase()
            ).length
          );
        } else {
          console.error("Incorrect response for pet recommendation: ", data);
        }
      });
    } catch (error) {
      console.error("Error fetching next pet recommendation:", error);
    }
  };

  return (
    <>
      {/* Container for ShelterView header */}
      <Container className="text-center mt-4">
        <h1>Welcome, {userName}!</h1>
      </Container>

      {/* Section to manage pets at the shelter */}
      <Container className="mt-4">
        <h3>Manage pets at your shelter:</h3>
        <Row className="mt-4 text-center">
          {shelterPets.map((pet) => (
            <PetCard
              key={pet.petId}
              pet={pet}
              imageSrc={pet.imageUrl ? backendApi.imagePath(pet.imageUrl) : ""}
              attributeGroups={attributeGroups}
            />
          ))}
        </Row>
      </Container>

      {/* Section to manage adoption applications and pet registration */}
      <Container className="mt-4">
        <h4>Adoption applications:</h4>
        <p>
          {" "}
          {newAdoptions > 0 ? (
            <>
              You have <b>{newAdoptions}</b> new adoptions.
            </>
          ) : (
            <>You didn’t receive any new applications yet.</>
          )}
          <Nav.Link as={Link} to="/adoption" className="d-inline">
            View details
          </Nav.Link>
          .
        </p>
        <h4>Register new pet:</h4>
        <p>
          Fill out the new pet registration form{" "}
          <Nav.Link as={Link} to="/PetManagementMain" className="d-inline">
            here
          </Nav.Link>
          .
        </p>
        <h4>Your shelter profile:</h4>
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

export default ShelterView;
