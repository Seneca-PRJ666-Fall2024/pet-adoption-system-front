import React, { useState } from "react";
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

const PetManagementMain = () => {
  const [applications, setApplications] = useState([
    {
        id: 1,
        petName: "Buddy",
        petType: "Dog",
        petAge: "2 years",
        petGender: "Male",
        status: "Waitlisted",
        petBreed: "Poodle",
        adopterInfoType: "new",
        existingAdopterId: "",
        adopterName: "John Doe",
        dateOfBirth: "1990-01-01",
        contactNumber: "123-456-7890",
        email: "john@example.com",
        homeAddress: "123 Main St",
        housingType: "House",
        rentOrOwn: "own",
        landlordContact: "",
        fencedYard: "Yes",
        activeLifestyle: "Very active",
        hoursAlone: "2",
        crateTraining: "Yes",
        sleepingArrangements: "Inside",
        priorExperience: "Yes",
        currentPets: "None",
        vetContact: "Dr. Smith, 987-654-3210",
        exercisePlan: "Daily walks",
        groomingPlan: "Weekly grooming",
        travelPlan: "Pet sitter",
        behavioralExpectations: "Well-behaved",
        commitmentAcknowledgement: true,
        references: "Jane Doe, 555-123-4567",
        petSocial: "cats"

    },
    {
        id: 2,
        petName: "Max",
        petType: "Dog",
        petAge: "4 years",
        petGender: "Male",
        status: "Interviewing",
        petBreed: "Chihuahua",
        adopterInfoType: "existing",
        existingAdopterId: "1",
        adopterName: "Jane Smith",
        dateOfBirth: "1985-05-15",
        contactNumber: "987-654-3210",
        email: "jane@example.com",
        homeAddress: "456 Elm St",
        housingType: "Apartment",
        rentOrOwn: "rent",
        landlordContact: "Mr. Johnson, 123-789-4560",
        fencedYard: "No",
        activeLifestyle: "Moderately active",
        hoursAlone: "4",
        crateTraining: "No",
        sleepingArrangements: "On the bed",
        priorExperience: "No",
        currentPets: "One cat, 2 years old",
        vetContact: "Dr. Brown, 123-123-1234",
        exercisePlan: "Walks every evening",
        groomingPlan: "Monthly grooming",
        travelPlan: "Take with us",
        behavioralExpectations: "Calm and quiet",
        commitmentAcknowledgement: true,
        references: "Bob Johnson, 555-987-6543",
        petSocial: "dogs"
    },
    {
        id: 3,
        petName: "Bella",
        petType: "Cat",
        petAge: "3 years",
        petGender: "Female",
        status: "Rejected",
        petBreed: "American Bobtail",
        adopterInfoType: "new",
        existingAdopterId: "",
        adopterName: "Mike Wilson",
        dateOfBirth: "1992-02-20",
        contactNumber: "321-654-9870",
        email: "mike@example.com",
        homeAddress: "789 Oak St",
        housingType: "Townhouse",
        rentOrOwn: "own",
        landlordContact: "",
        fencedYard: "No",
        activeLifestyle: "Quiet",
        hoursAlone: "6",
        crateTraining: "No",
        sleepingArrangements: "In a pet bed",
        priorExperience: "Yes, with dogs",
        currentPets: "None",
        vetContact: "Dr. Green, 456-789-0123",
        exercisePlan: "Playtime indoors",
        groomingPlan: "Brushing twice a week",
        travelPlan: "Boarding facility",
        behavioralExpectations: "Playful but calm",
        commitmentAcknowledgement: true,
        references: "Sarah Lee, 444-555-6666",
        petSocial: "dogs"
    },
  ]);

  const [existingAdopters, setExistingAdopters] = useState([
    {
      id: 1,
      name: "John Doe",
      birthday: "1990-01-01",
      gender: "Male",
      homeAddress: "123 Main St",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      birthday: "1985-05-15",
      gender: "Female",
      homeAddress: "456 Elm St",
      phoneNumber: "987-654-3210",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const [newPetProfile, setNewPetProfile] = useState({
    petName: "",
    petInfoType: "new",
    existingPetId: "",
    PetName: "",
    petBirthday: "",
    petGender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPetProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPetProfile = () => {
    setCurrentApplication({
      id: applications.length + 1, // Generate a new ID
      petName: "",
      petType: "",
      petGender: "",
      petBreed: "",
      petSocial: "",
      petBirthday: "",
    }); // Initialize with empty fields
    setShowModal(true); // Open the modal
  };
  

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

  const handleViewDetails = (application) => {
    setCurrentApplication(application);
    setShowDetailsModal(true);
  };

  const updateApplication = (updatedApplication) => {
    setApplications((prevApps) => {
      // Check if the application already exists
      const existingIndex = prevApps.findIndex((app) => app.id === updatedApplication.id);
  
      if (existingIndex !== -1) {
        // Update an existing application
        return prevApps.map((app) =>
          app.id === updatedApplication.id ? updatedApplication : app
        );
      } else {
        // Add a new application
        return [...prevApps, updatedApplication];
      }
    });
  
    setShowModal(false); // Close the modal
  };
  
  
  
  

  return (
    <>
      <NavbarComponent userRole="shelter" />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Pet Profile Management</h3>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Add New Pet Profile
          </Button>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Pet Age</th>
              <th>Pet Breed</th>
              <th>Pet Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id}>
                <td>{index + 1}</td>
                <td>{app.petName}</td>
                <td>{app.petType}</td>
                <td>{app.petAge}</td>
                <td>{app.petBreed}</td>
                <td>{app.petGender}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(app)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteApplication(app.id)}
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
           application={newPetProfile}
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
          {currentApplication && (
           <PetManagement
           application={currentApplication} // Pass selected pet
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
