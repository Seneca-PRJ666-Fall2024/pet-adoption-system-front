import React, {useContext, useEffect, useState} from "react";
import {
  Container,
  Table,
  Button,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import NewPetAdoptionApplication from "./NewPetAdoptionApplication"; // Import the new component
import "../styles/AdoptionManagement.css";
import AuthContext from "../context/AuthContext";
import {initBackendApi} from "./BackendApi";

const AdoptionManagement = () => {

    const { userRole, token } = useContext(AuthContext);
    const [backendApi, setBackendApi] = useState(null);
    useEffect(() => {
        if (token) {
            const apiInstance = initBackendApi(token);
            setBackendApi(apiInstance);
        }
    }, [token]);

    const [applications, setApplications] = useState([]);
    const [petAttributes, setPetAttributes] = useState([])

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentStatusChange, setCurrentStatusChange] = useState({});

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

    useEffect(() => {
        if (!backendApi) return;
        fetchAdoptions();
    }, [backendApi]);

    const fetchAdoptions = async () => {
        if (!backendApi) {
            console.error("Backend API is not initialized");
            return;
        }

        try {
            backendApi.adoption.adoptionStatusGet((error, data, response) => {
                if (error) {
                    console.error("Error fetching adoptions:", error);
                    return;
                }

                if (data && Array.isArray(data.payload)) {
                    console.log("Fetched adoptions:", data);
                    setApplications(data.payload);

                    // Collect unique keys from pet profiles, excluding certain keys
                    const excludedKeys = new Set(["petName", "petId", "imageUrl", "shelterUserId"]);
                    const uniqueAttributes = new Set();

                    data.payload.forEach((adoption) => {
                        if(adoption && adoption.pet){
                            Object.entries(adoption.pet).forEach(([key, value]) => {
                                if (value !== null && value !== undefined && value !== "" && !excludedKeys.has(key)) {
                                    uniqueAttributes.add(key);
                                }
                            });
                        }
                    });

                    // Set the unique attributes
                    setPetAttributes(Array.from(uniqueAttributes));
                } else {
                    console.error("Incorrect response for pet recommendation: ", data);
                }
            });
        } catch (error) {
            console.error("Error fetching next pet recommendation:", error);
        }
    };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setNewApplication((prev) => {
      const updatedApplication = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
  
      // Log the updated application state
      console.log(updatedApplication);
  
      return updatedApplication;
    });
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

      // Simulate sending data to the server
      // setApplications((prevApps) => [...prevApps, newApp]);
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

  const handleCancelApplication = (adoptionId) => {
    setApplicationToCancel(adoptionId);
    setShowCancelModal(true);
  };

  const confirmCancelApplication = async () => {
      try {
          if(applicationToCancel){
              await new Promise((resolve, reject) => {
                  backendApi.adoption.adoptionIdCancelPut(applicationToCancel, (error, data, response) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(data);
                      }
                  });
              });
              console.log("Pet profile deleted successfully.");
              setApplicationToCancel(null);
              fetchAdoptions();
          }
      } catch (error) {
          console.error("API call failed:", error.message);
          throw new Error("Failed to delete pet profile: " + error.message);
      }
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

  const handleStatusChangeRequest = (adoption, currentStatus, newStatus) => {
    setCurrentStatusChange({ adoption, currentStatus, newStatus });
    setShowConfirmModal(true);
  };

  const handleConfirmStatusChange = async () => {
    const { adoption, _, newStatus  } = currentStatusChange;

      try {
          if(adoption && newStatus){
              adoption.status = newStatus;
              await new Promise((resolve, reject) => {
                  backendApi.adoption.adoptionIdStatusPut(adoption.adoptionId, adoption, (error, data, response) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(data);
                      }
                  });
              });
              console.log("Adoption status was updated successfully.");
              setCurrentStatusChange({});
              fetchAdoptions();
          }
      } catch (error) {
          console.error("API call failed:", error.message);
          throw new Error("Failed to delete pet profile: " + error.message);
      }

    setShowConfirmModal(false);
  };

  const statusOptions = [
    "Submitted",
    "Reviewing",
    "Waitlisted",
    "Interviewing",
    "Decision Making",
    "Adopted",
    "Rejected",
    "Cancelled",
  ];

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
      <NavbarComponent/>
      <Container className="my-4">
        {/*<div className="d-flex justify-content-between align-items-center">*/}
        {/*  <h3>Your Adoption Applications</h3>*/}
        {/*  {userRole === "adopter" && (*/}
        {/*    <Button variant="success" onClick={() => setShowModal(true)}>*/}
        {/*      Create New Application*/}
        {/*    </Button>*/}
        {/*  )}*/}
        {/*</div>*/}

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Pet Name</th>
                {userRole === "shelter" && (
                    <th>Adopter Name</th>
                )}
                {petAttributes.map((attribute) => (
                    <th key={attribute}>{attribute}</th>
                ))}
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.adoptionId}>
                  <td>{index + 1}</td>
                  <td>
                      <img src={app.pet.imageUrl ? backendApi.imagePath(app.pet.imageUrl) : ''}
                           alt="Preview" style={{height: "40px"}}/>
                  </td>
                  <td>{app.pet.petName}</td>
                  {userRole === "shelter" && (
                      <td>{app.adopter.username}</td>
                  )}
                  {petAttributes.map((attribute) => (
                      <td key={attribute}>{app.pet[attribute] || '-'}</td>
                  ))}
                <td>
                  {userRole === "shelter" ? (
                    <Form.Select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChangeRequest(
                          app,
                          app.status,
                          e.target.value
                        )
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    app.status
                  )}
                </td>
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
                    onClick={() => handleCancelApplication(app.adoptionId)}
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
      <Modal show={showModal}  size="xl" onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Application</Modal.Title>
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
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Viewing Details */}
      <Modal size="lg" show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentApplication && (
              <>
                  <p><strong>Application Status:</strong> {currentApplication.status}</p>
                  <p style={{
                      borderTop: '2px solid rgba(45, 118, 127, 0.7)', // Thicker line with 50% opacity
                      width: '100%',                    // Centered at 50% width
                  }}/>
                  <img src={backendApi.imagePath(currentApplication.pet.imageUrl) || ""} alt="Pet Image" style={{width: "200px"}}/>
                  <p><strong>Pet Name:</strong> {currentApplication.pet.petName}</p>
                  <p><strong>Pet Type:</strong> {currentApplication.pet.petType}</p>
                  <p><strong>Pet Age:</strong> {currentApplication.pet.petAge}</p>
                  <p><strong>Pet Breed:</strong> {currentApplication.pet.petBreed}</p>
                  <p><strong>Pet Gender:</strong> {currentApplication.pet.petGender}</p>
                  <p style={{
                      borderTop: '2px solid rgba(45, 118, 127, 0.7)', // Thicker line with 50% opacity
                      width: '100%',                    // Centered at 50% width
                  }}/>
                  <img src={backendApi.imagePath(currentApplication.adopter.imageUrl) || ""} alt="Adopter Image"
                       style={{width: "200px"}}/>
                  <p><strong>Adopter Name:</strong> {currentApplication.adopter.username}</p>
                  <p><strong>Date of Birth:</strong> {currentApplication.dateOfBirth}</p>
                  <p><strong>Contact Number:</strong> {currentApplication.adopter.phone}</p>
                  <p><strong>Email:</strong> {currentApplication.adopter.email}</p>
                  <p><strong>Home Address:</strong> {currentApplication.adopter.address}</p>
                  <p><strong>City:</strong> {currentApplication.adopter.city}</p>
                  <p><strong>Province:</strong> {currentApplication.adopter.province}</p>
                  <p><strong>Postal Code:</strong> {currentApplication.adopter.postalCode}</p>
                  <p style={{
                      borderTop: '2px solid rgba(45, 118, 127, 0.7)', // Thicker line with 50% opacity
                      width: '100%',                    // Centered at 50% width
                  }}/>
                  <p><strong>Housing Type:</strong> {currentApplication.housingType}</p>
                  <p><strong>Rent or Own:</strong> {currentApplication.rentOrOwn}</p>
                  <p><strong>Landlord Contact:</strong> {currentApplication.landlordContact}</p>
                  <p><strong>Fenced Yard:</strong> {currentApplication.fencedYard}</p>
                  <p><strong>Active Lifestyle:</strong> {currentApplication.activeLifestyle}</p>
                  <p><strong>Hours Alone:</strong> {currentApplication.hoursAlone}</p>
                  <p><strong>Crate Training:</strong> {currentApplication.crateTraining}</p>
                  <p><strong>Sleeping Arrangements:</strong> {currentApplication.sleepingArrangements}</p>
                  <p><strong>Prior Experience:</strong> {currentApplication.priorExperience}</p>
                  <p><strong>Current Pets:</strong> {currentApplication.currentPets}</p>
                  <p><strong>Vet Contact:</strong> {currentApplication.vetContact}</p>
                  <p><strong>Exercise Plan:</strong> {currentApplication.exercisePlan}</p>
                  <p><strong>Grooming Plan:</strong> {currentApplication.groomingPlan}</p>
                  <p><strong>Travel Plan:</strong> {currentApplication.travelPlan}</p>
                  <p><strong>Behavioral Expectations:</strong> {currentApplication.behavioralExpectations}</p>
                  <p><strong>Commitment
                      Acknowledgement:</strong> {currentApplication.commitmentAcknowledgement ? "Yes" : "No"}</p>
                  <p><strong>References:</strong> {currentApplication.references}</p>
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

      {/* Modal for Status Change Confirmation */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you want to change the status from{" "}
          <strong>{currentStatusChange.currentStatus}</strong> to{" "}
          <strong style={{ fontWeight: "bold" }}>
            {currentStatusChange.newStatus}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmStatusChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default AdoptionManagement;
