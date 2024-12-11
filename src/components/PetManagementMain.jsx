import React, {useContext, useState, useEffect} from "react";
import {
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import "../styles/AdoptionManagement.css";
import PetManagement from "./PetManagement";
import AuthContext from "../context/AuthContext";
import {initBackendApi} from "./BackendApi";
import { useLocation } from 'react-router-dom';

const PetManagementMain = () => {
    const { userRole, token } = useContext(AuthContext);
    const [backendApi, setBackendApi] = useState(null);
    useEffect(() => {
        if (token) {
            const apiInstance = initBackendApi(token);
            setBackendApi(apiInstance);
        }
    }, [token]);

    const [shelterPets, setShelterPets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [currentPet, setCurrentPet] = useState(null);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState(null);
    const [attributeGroups, setAttributeGroups] = useState([]);

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
            throw new Error("Failed to load attribute groups: " + error.message);
        }
    };


    const fetchPetProfiles = async () => {
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
                    console.log("Fetched pet recommendation:", data);
                    setShelterPets(data.payload);
                } else {
                    console.error("Incorrect response for pet recommendation: ", data);
                }
            });
        } catch (error) {
            console.error("Error fetching next pet recommendation:", error);
        }
    };

    useEffect(() => {
        if (!backendApi) return;
        fetchPetProfiles();
        loadAttributeGroups();
    }, [backendApi]);

    const handleViewDetails = (petData) => {
        setCurrentPet(petData);
        setShowDetailsModal(true);
    };

    const handleAddPetProfile = () => {
        setCurrentPet({}); // Initialize with empty fields
        setShowModal(true); // Open the modal
    };

  const handleDeleteApplication = (petId) => {
    setApplicationToDelete(petId);
    setShowCancelModal(true);
  };

  const confirmDeleteApplication = async () => {
      try {
          if(applicationToDelete){
              await new Promise((resolve, reject) => {
                  backendApi.pet.petDeleteProfilePetIdDelete(applicationToDelete, (error, data, response) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(data);
                      }
                  });
              });
              console.log("Pet profile deleted successfully.");
              fetchPetProfiles();
          }
      } catch (error) {
          console.error("API call failed:", error.message);
          throw new Error("Failed to delete pet profile: " + error.message);
      }
    setShowCancelModal(false);
  };

const updateApplication = async (petData) => {
    try {
        await new Promise((resolve, reject) => {
            if(petData.petId){
                backendApi.pet.petUpdateProfilePut(petData, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                backendApi.pet.petAddProfilePost(petData, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            }
        });
        console.log("Pet profile updated successfully.");
        fetchPetProfiles();
        loadAttributeGroups();
    } catch (error) {
        console.error("API call failed:", error.message);
        throw new Error("Failed to update pet profile: " + error.message);
    }
    setShowModal(false); // Close the modal
};

  return (
    <>
      <NavbarComponent userRole="shelter" />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Pet Profile Management</h3>
          <Button variant="success" onClick={() => handleAddPetProfile()}>
            Add New Pet Profile
          </Button>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
          <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Pet Name</th>
              <th>Pet Gender</th>
              <th>Pet Type</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {shelterPets.map((pet, index) => (
                <tr key={pet.petId}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={pet.imageUrl ? backendApi.imagePath(pet.imageUrl) : ''}
                             alt="Preview" style={{height: "40px"}}/>
                    </td>
                    <td>{pet.petName}</td>
                    <td>{pet.petGender}</td>
                    <td>{pet.petType}</td>
                    <td>
                        <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleViewDetails(pet)}
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteApplication(pet.petId)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal for Adding New Pet Profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add New Pet Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PetManagement
            petProfile={{}}
           updateApplication={updateApplication}
           closeModal={() => setShowModal(false)} // Close modal callback
            attributeGroups={attributeGroups}
         />
        </Modal.Body>
      </Modal>

      {/* Modal for Viewing Details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Pet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPet && (
           <PetManagement
           petProfile={currentPet} // Pass selected pet
           updateApplication={updateApplication}
           closeModal={() => setShowDetailsModal(false)} // Close modal callback
           attributeGroups={attributeGroups}
         />
          )}
        </Modal.Body>
      </Modal>

      {/* Modal for Cancel Confirmation */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Pet Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this pet profile?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDeleteApplication}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default PetManagementMain;
