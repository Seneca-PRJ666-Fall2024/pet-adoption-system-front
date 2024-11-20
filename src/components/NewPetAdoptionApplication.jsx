import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewPetAdoptionApplication = ({ onSubmit }) => {
    const [newApplication, setNewApplication] = useState({
      petName: "",
      adopterInfoType: "new", // Default to new adopter info
      existingAdopterId: "",
      adopterName: "",
      dateOfBirth: "",
      contactNumber: "",
      email: "",
      homeAddress: "",
      housingType: "",
      rentOrOwn: "own",
      landlordContact: "",
      fencedYard: "",
      activeLifestyle: "",
      hoursAlone: "",
      crateTraining: "",
      sleepingArrangements: "",
      priorExperience: "",
      currentPets: "",
      vetContact: "",
      exercisePlan: "",
      groomingPlan: "",
      travelPlan: "",
      behavioralExpectations: "",
      commitmentAcknowledgement: false,
      references: "",
    });

      // Static data for testing
  const matchedPets = [
    { id: 1, name: "Buddy", type: "Dog", age: 3, gender: "Male" },
    { id: 2, name: "Luna", type: "Cat", age: 2, gender: "Female" },
    { id: 3, name: "Charlie", type: "Dog", age: 5, gender: "Male" },
  ];

  const existingAdopters = [
    {
      id: 1,
      name: "John Doe",
      homeAddress: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      homeAddress: "456 Elm St",
    },
  ];
  
    // const [matchedPets, setMatchedPets] = useState([]);
    // const [existingAdopters, setExistingAdopters] = useState([]);
  
    // // Fetch matched pet info and existing adopter info from the server
    // useEffect(() => {
    //   // Fetch matched pet info
    //   fetch("http://143.198.40.227/matched-pets")
    //     .then((response) => response.json())
    //     .then((data) => setMatchedPets(data))
    //     .catch((error) => console.error("Error fetching matched pets:", error));
  
    //   // Fetch existing adopter info
    //   fetch("http://143.198.40.227/dopters_info")
    //     .then((response) => response.json())
    //     .then((data) => setExistingAdopters(data))
    //     .catch((error) => console.error("Error fetching adopters:", error));
    // }, []);
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setNewApplication((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(newApplication);
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        {/* Pet Name */}
        <Form.Group controlId="formPetName">
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            as="select"
            name="petName"
            value={newApplication.petName}
            onChange={handleInputChange}
          >
            <option value="">Select Pet</option>
            {matchedPets.map((pet) => (
              <option key={pet.id} value={pet.name}>
                {pet.name}, {pet.type}, {pet.age}yr, {pet.gender}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
  
        {/* Adopter Information Type */}
        <Form.Group controlId="formAdopterInfoType" className="mt-3">
          <Form.Label>Adopter Information</Form.Label>
          <Form.Check
            type="radio"
            label="Use Existing Adopter Info"
            name="adopterInfoType"
            value="existing"
            checked={newApplication.adopterInfoType === "existing"}
            onChange={handleInputChange}
          />
          <Form.Check
            type="radio"
            label="Create New Adopter Info"
            name="adopterInfoType"
            value="new"
            checked={newApplication.adopterInfoType === "new"}
            onChange={handleInputChange}
          />
        </Form.Group>
  
        {/* Existing Adopter Dropdown */}
        {newApplication.adopterInfoType === "existing" && (
          <Form.Group controlId="formExistingAdopterId" className="mt-2">
            <Form.Label>Select Existing Adopter</Form.Label>
            <Form.Control
              as="select"
              name="existingAdopterId"
              value={newApplication.existingAdopterId}
              onChange={handleInputChange}
            >
              <option value="">Select Existing Adopter</option>
              {existingAdopters.map((adopter) => (
                <option key={adopter.id} value={adopter.id}>
                  {adopter.name} - {adopter.homeAddress}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
  
        {/* New Adopter Information */}
        {newApplication.adopterInfoType === "new" && (
          <>
            <Form.Group controlId="formAdopterName" className="mt-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="adopterName"
                value={newApplication.adopterName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </Form.Group>
  
            <Form.Group controlId="formDateOfBirth" className="mt-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={newApplication.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Form.Group controlId="formContactNumber" className="mt-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={newApplication.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </Form.Group>
  
            <Form.Group controlId="formEmail" className="mt-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newApplication.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </Form.Group>
  
            <Form.Group controlId="formHomeAddress" className="mt-2">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                name="homeAddress"
                value={newApplication.homeAddress}
                onChange={handleInputChange}
                placeholder="Enter your home address"
              />
            </Form.Group>
          </>
        )}

      {/* Detailed Questions (Outside of Adopter Information) */}
      <Form.Group controlId="formHousingType" className="mt-2">
        <Form.Label>Housing Type</Form.Label>
        <Form.Control
          type="text"
          name="housingType"
          value={newApplication.housingType}
          onChange={handleInputChange}
          placeholder="E.g., house, apartment, condo"
        />
      </Form.Group>

      <Form.Group controlId="formRentOrOwn" className="mt-2">
        <Form.Label>Do you rent or own?</Form.Label>
        <Form.Check
          type="radio"
          label="Own"
          name="rentOrOwn"
          value="own"
          checked={newApplication.rentOrOwn === "own"}
          onChange={handleInputChange}
        />
        <Form.Check
          type="radio"
          label="Rent"
          name="rentOrOwn"
          value="rent"
          checked={newApplication.rentOrOwn === "rent"}
          onChange={handleInputChange}
        />
      </Form.Group>

      {newApplication.rentOrOwn === "rent" && (
        <Form.Group controlId="formLandlordContact" className="mt-2">
          <Form.Label>Landlord Contact Information</Form.Label>
          <Form.Control
            type="text"
            name="landlordContact"
            value={newApplication.landlordContact}
            onChange={handleInputChange}
            placeholder="Enter landlord contact details"
          />
        </Form.Group>
      )}

      <Form.Group controlId="formFencedYard" className="mt-2">
        <Form.Label>Do you have a fenced yard?</Form.Label>
        <Form.Control
          type="text"
          name="fencedYard"
          value={newApplication.fencedYard}
          onChange={handleInputChange}
          placeholder="Describe your yard or enter 'No'"
        />
      </Form.Group>

      
    <Form.Group controlId="formActiveLifestyle" className="mt-2">
    <Form.Label>How active is your lifestyle?</Form.Label>
    <Form.Control
        type="text"
        name="activeLifestyle"
        value={newApplication.activeLifestyle}
        onChange={handleInputChange}
        placeholder="E.g., very active, moderately active, quiet"
    />
    </Form.Group>

    <Form.Group controlId="formHoursAlone" className="mt-2">
    <Form.Label>How many hours will the pet be left alone daily?</Form.Label>
    <Form.Control
        type="number"
        name="hoursAlone"
        value={newApplication.hoursAlone}
        onChange={handleInputChange}
    />
    </Form.Group>

    <Form.Group controlId="formCrateTraining" className="mt-2">
    <Form.Label>Do you plan to use crate training?</Form.Label>
    <Form.Control
        type="text"
        name="crateTraining"
        value={newApplication.crateTraining}
        onChange={handleInputChange}
        placeholder="Enter details or 'No'"
    />
    </Form.Group>

    <Form.Group controlId="formSleepingArrangements" className="mt-2">
    <Form.Label>Where will the pet sleep?</Form.Label>
    <Form.Control
        type="text"
        name="sleepingArrangements"
        value={newApplication.sleepingArrangements}
        onChange={handleInputChange}
        placeholder="Describe sleeping arrangements"
    />
    </Form.Group>

    <Form.Group controlId="formPriorExperience" className="mt-2">
    <Form.Label>Do you have prior experience with pets?</Form.Label>
    <Form.Control
        type="text"
        name="priorExperience"
        value={newApplication.priorExperience}
        onChange={handleInputChange}
        placeholder="Describe your experience or enter 'No'"
    />
    </Form.Group>

    <Form.Group controlId="formCurrentPets" className="mt-2">
    <Form.Label>Do you have other pets? Please provide details.</Form.Label>
    <Form.Control
        type="text"
        name="currentPets"
        value={newApplication.currentPets}
        onChange={handleInputChange}
        placeholder="E.g., species, breed, age"
    />
    </Form.Group>

    <Form.Group controlId="formVetContact" className="mt-2">
    <Form.Label>Veterinarian Contact Information</Form.Label>
    <Form.Control
        type="text"
        name="vetContact"
        value={newApplication.vetContact}
        onChange={handleInputChange}
        placeholder="Enter vet's name and contact details"
    />
    </Form.Group>

    <Form.Group controlId="formExercisePlan" className="mt-2">
    <Form.Label>How will you exercise your pet?</Form.Label>
    <Form.Control
        type="text"
        name="exercisePlan"
        value={newApplication.exercisePlan}
        onChange={handleInputChange}
        placeholder="Describe your exercise plan"
    />
    </Form.Group>

    <Form.Group controlId="formGroomingPlan" className="mt-2">
    <Form.Label>How often will you groom your pet?</Form.Label>
    <Form.Control
        type="text"
        name="groomingPlan"
        value={newApplication.groomingPlan}
        onChange={handleInputChange}
        placeholder="Describe your grooming plan"
    />
    </Form.Group>

    <Form.Group controlId="formTravelPlan" className="mt-2">
    <Form.Label>What will you do with your pet when you travel?</Form.Label>
    <Form.Control
        type="text"
        name="travelPlan"
        value={newApplication.travelPlan}
        onChange={handleInputChange}
        placeholder="Describe your travel arrangements"
    />
    </Form.Group>

    <Form.Group controlId="formBehavioralExpectations" className="mt-2">
    <Form.Label>What are your behavioral expectations for your pet?</Form.Label>
    <Form.Control
        type="text"
        name="behavioralExpectations"
        value={newApplication.behavioralExpectations}
        onChange={handleInputChange}
        placeholder="Describe any traits or behaviors you expect or want to avoid"
    />
    </Form.Group>

    <Form.Group controlId="formCommitmentAcknowledgement" className="mt-3">
    <Form.Check
        type="checkbox"
        name="commitmentAcknowledgement"
        checked={newApplication.commitmentAcknowledgement}
        onChange={handleInputChange}
        label="I understand the responsibilities of pet ownership and commit to caring for this pet for its lifetime."
    />
    </Form.Group>

    <Form.Group controlId="formReferences" className="mt-2">
    <Form.Label>References (Please provide at least one)</Form.Label>
    <Form.Control
        as="textarea"
        rows={2}
        name="references"
        value={newApplication.references}
        onChange={handleInputChange}
        placeholder="Enter names and contact details of references"
    />
    </Form.Group>

    </Form>
  );
};

export default NewPetAdoptionApplication;
