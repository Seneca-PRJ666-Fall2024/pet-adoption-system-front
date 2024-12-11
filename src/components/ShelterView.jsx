import React, {useContext, useEffect, useState} from 'react';
import {Container, Modal, Nav, Row} from 'react-bootstrap';
import PetCard from './PetCard';
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {initBackendApi} from "./BackendApi";

const ShelterView = () => {
    const { token, logout, userName } = useContext(AuthContext);
    const [backendApi, setBackendApi] = useState(null);
    const [shelterPets, setShelterPets] = useState([]);
    const [newAdoptions, setNewAdoptions] = useState(0);
    const [attributeGroups, setAttributeGroups] = useState([]);

    useEffect(() => {
        if (token) {
            const apiInstance = initBackendApi(token,(res) => {if(res.status === 403){logout()}});
            setBackendApi(apiInstance);
        }
    }, [token]);

    useEffect(() => {
        if (!backendApi) return;
        fetchAdoptions();
        loadAttributeGroups();
    }, [backendApi]);

    const loadAttributeGroups = async () => {
        try {
            await new Promise((resolve, reject) => {
                backendApi.pet.petAttributesGet((error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        setAttributeGroups(data.payload)
                        resolve(data);
                    }
                });
            });

            console.log("Attribute groups loaded successfully.");
        } catch (error) {
            console.error("API call failed:", error.message);
        }
    };

    const fetchAdoptions = async () => {
        if (!backendApi) {
            console.error("Backend API is not initialized");
            return;
        }

        try {
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
            backendApi.adoption.adoptionStatusGet((error, data, response) => {
                if (error) {
                    console.error("Error fetching adoptions:", error);
                    return;
                }

                if (data && Array.isArray(data.payload)) {
                    setNewAdoptions(data.payload.filter(item => item.status && item.status.toLowerCase()).length);
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
          <Container className="text-center mt-4">
              <h1>Welcome{userName ? ", " + userName : ""}!</h1>
          </Container>

          <Container className="mt-4">
              <h3>Manage pets at your shelter:</h3>
              <Row className="mt-4 text-center">
              {shelterPets.map((pet) => (
                  <PetCard
                      key={pet.petId}
                      pet={pet}
                      imageSrc={pet.imageUrl ? backendApi.imagePath(pet.imageUrl) : ''}
                      attributeGroups ={attributeGroups}
                  />
              ))}
              </Row>
          </Container>

          <Container className="mt-4">
              <h4>Adoption applications:</h4>
              <p> {newAdoptions > 0 ?
                  (<>You have <b>{newAdoptions}</b> new adoptions.</>) :
                  (<>You didn’t receive any new applications yet.</>)}
                  <Nav.Link as={Link} to="/adoption" className="d-inline">View details</Nav.Link>.
              </p>
              <h4>Register new pet:</h4>
              <p>Fill out the new pet registration form <Nav.Link as={Link} to="/PetManagementMain" className="d-inline">here</Nav.Link>.</p>
              <h4>Your shelter profile:</h4>
              <p><Nav.Link as={Link} to="/ProfileSetup" className="d-inline">Click here to review or update your profile</Nav.Link>.</p>
          </Container>

      </>
  );
};

export default ShelterView;
