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

const PetManagementMain = () => {
    const { userRole, token } = useContext(AuthContext);
    const [backendApi, setBackendApi] = useState(null);
    useEffect(() => {
        if (token) {
            const apiInstance = initBackendApi(token);
            setBackendApi(apiInstance);
        }
    }, [token]);

    const [shelterPets, setShelterPets] = useState([])

    useEffect(() => {
        if (!backendApi) return;
        try {
            backendApi.pet.petGetProfileGet((error, data, response) => {
                if (error) {
                    console.error("Error fetching next pet recommendation:", error);
                } else if (data && Array.isArray(data.payload)) {
                    console.log("Fetched pet recommendation:", data);
                    setShelterPets(data.payload);
                } else {
                    console.error("Incorrect response for pet recommendation: ", data);
                }
            });
        } catch (error) {
            console.error("Error fetching next pet recommendation:", error);
        }
    }, [backendApi]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const handleSave = () => {
    setIsSaving(true);
    try {
      updateApplication(formData); // Pass updated data to the parent
      closeModal(); // Close the modal after saving
      // alert("Pet details updated successfully!");
    } catch (error) {
      console.error("Error updating pet details:", error);
      alert("Failed to save pet details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

    const handleViewDetails = (petData) => {
        setCurrentPet(petData);
        setShowDetailsModal(true);
    };

    const handleAddPetProfile = () => {
        setCurrentPet({}); // Initialize with empty fields
        setShowModal(true); // Open the modal
    };

  const handleDeleteApplication = (id) => {
    setApplicationToDelete(id);
    setShowCancelModal(true);
  };

  const confirmDeleteApplication = () => {
    setApplications((prevApps) =>
      prevApps.filter((app) =>
        app.id !== applicationToDelete)
    );
    setShowCancelModal(false);
  };

  const updateApplication = (updatedApplication) => {
      // TODO: Update pet profile
    // setApplications((prevApps) => {
    //   // Check if the application already exists
    //   const existingIndex = prevApps.findIndex((app) => app.id === updatedApplication.id);
    //
    //   if (existingIndex !== -1) {
    //     // Update an existing application
    //     return prevApps.map((app) =>
    //       app.id === updatedApplication.id ? updatedApplication : app
    //     );
    //   } else {
    //     // Add a new application
    //     return [...prevApps, updatedApplication];
    //   }
    // });
  
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
              <th>Pet Type</th>
              <th>Pet Age</th>
              <th>Pet Breed</th>
              <th>Pet Gender</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {shelterPets.map((pet, index) => (
                <tr key={pet.petId}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={Array.isArray(pet.images) && pet.images.length > 0 ? backendApi.imagePath(pet.images[0]) : ''}
                             alt="Preview" style={{height: "40px"}}/>
                    </td>
                    <td>{pet.petName}</td>
                    <td>{pet.petType}</td>
                    <td>{pet.petAge}</td>
                    <td>{pet.petBreed}</td>
                    <td>{pet.petGender}</td>
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
           closeModal={() => setShowDetailsModal(false)} // Close modal callback
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
