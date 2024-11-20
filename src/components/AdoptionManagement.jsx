import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import NewPetAdoptionApplication from "./NewPetAdoptionApplication"; // Import the new component
import "../styles/AdoptionManagement.css";

const AdoptionManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      petName: "Buddy",
      petType: "Dog",
      petAge: "2 years",
      petGender: "Male",
      status: "Waitlisted",
    },
    {
      id: 2,
      petName: "Max",
      petType: "Dog",
      petAge: "4 years",
      petGender: "Male",
      status: "Interviewing",
    },
    {
      id: 3,
      petName: "Bella",
      petType: "Cat",
      petAge: "3 years",
      petGender: "Female",
      status: "Rejected",
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
  const [applicationToCancel, setApplicationToCancel] = useState(null);

  const [newApplication, setNewApplication] = useState({
    petName: "",
    adopterInfoType: "new",
    existingAdopterId: "",
    adopterName: "",
    birthday: "",
    gender: "",
    homeAddress: "",
    phoneNumber: "",
    reasonForAdoption: "",
    housingType: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewApplication((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitApplication = async () => {
    try {
      const adopterInfo =
        newApplication.adopterInfoType === "existing"
          ? existingAdopters.find(
              (adopter) => adopter.id === parseInt(newApplication.existingAdopterId)
            )
          : {
              name: newApplication.adopterName,
              birthday: newApplication.birthday,
              gender: newApplication.gender,
              homeAddress: newApplication.homeAddress,
              phoneNumber: newApplication.phoneNumber,
            };

      const newApp = {
        id: applications.length + 1,
        petName: newApplication.petName,
        petType: "Unknown", // Default value for testing
        petAge: "Unknown", // Default value for testing
        petGender: "Unknown", // Default value for testing
        adopterInfo,
        status: "Submitted",
        progress: 10, // Initial progress for a new submission
      };

      // Simulate sending data to the server
      setApplications((prevApps) => [...prevApps, newApp]);
      setShowModal(false);
      setNewApplication({
        petName: "",
        adopterInfoType: "new",
        existingAdopterId: "",
        adopterName: "",
        birthday: "",
        gender: "",
        homeAddress: "",
        phoneNumber: "",
        reasonForAdoption: "",
        housingType: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  const handleCancelApplication = (id) => {
    setApplicationToCancel(id);
    setShowCancelModal(true);
  };

  const confirmCancelApplication = () => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === applicationToCancel ? { ...app, status: "Cancelled", progress: 0 } : app
      )
    );
    setShowCancelModal(false);
  };

  const handleViewDetails = (application) => {
    setCurrentApplication(application);
    setShowDetailsModal(true);
  };

  const getProgressVariant = (progress) => {
    if (progress === 100) return "success";
    if (progress > 50) return "info";
    return "warning";
  };

  const updateProgress = (status) => {
    switch (status) {
      case "Submitted":
        return 10;
      case "Reviewing":
      case "Waitlisted":
        return 30;
      case "Interviewing":
        return 60;
      case "Decision Making":
        return 90;
      case "Adopted":
      case "Rejected":
        return 100;
      case "Cancelled":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <>
      <NavbarComponent userRole="adopter" />
      <Container className="my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Your Adoption Applications</h3>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Submit New Application
          </Button>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Pet Age</th>
              <th>Pet Gender</th>
              <th>Status</th>
              <th>Progress</th>
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
                <td>{app.petGender}</td>
                <td>{app.status}</td>
                <td>
                  <ProgressBar
                    now={updateProgress(app.status)}
                    label={`${updateProgress(app.status)}%`}
                    variant={getProgressVariant(updateProgress(app.status))}
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(app)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelApplication(app.id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal for New Application */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit New Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewPetAdoptionApplication
            newApplication={newApplication}
            handleInputChange={handleInputChange}
            existingAdopters={existingAdopters}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitApplication}
            disabled={
              !newApplication.petName.trim() ||
              (newApplication.adopterInfoType === "new" &&
                (!newApplication.adopterName.trim() ||
                  !newApplication.birthday ||
                  !newApplication.gender ||
                  !newApplication.homeAddress.trim() ||
                  !newApplication.phoneNumber.trim())) ||
              (newApplication.adopterInfoType === "existing" &&
                !newApplication.existingAdopterId)
            }
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Viewing Details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentApplication && (
            <>
              <p><strong>Pet Name:</strong> {currentApplication.petName}</p>
              <p><strong>Pet Type:</strong> {currentApplication.petType}</p>
              <p><strong>Pet Age:</strong> {currentApplication.petAge}</p>
              <p><strong>Pet Gender:</strong> {currentApplication.petGender}</p>
              <p><strong>Status:</strong> {currentApplication.status}</p>
              <p><strong>Progress:</strong> {updateProgress(currentApplication.status)}%</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Cancel Confirmation */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this application?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmCancelApplication}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default AdoptionManagement;
