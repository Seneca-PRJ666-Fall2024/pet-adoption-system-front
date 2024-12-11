import React, {useContext, useEffect, useState} from "react";
import {Form, Button, Card, Row, Col, Image} from "react-bootstrap";
import {initBackendApi} from "./BackendApi";
import AuthContext from "../context/AuthContext";
import PetProfile from "./PetProfile";

const NewPetAdoptionApplication = ({ newApplication, handleInputChange, attributeGroups }) => {
  const [matchedRecommendations, setMatchedRecommendations] = useState([])

  const [selectedRecommendation, setSelectedRecommendation] = useState(null)

  const { userRole, token } = useContext(AuthContext);
  const [backendApi, setBackendApi] = useState(null);

  useEffect(() => {
    if (token) {
      const apiInstance = initBackendApi(token);
      setBackendApi(apiInstance);
    }
  }, [token]);

  useEffect(() => {
    if (!backendApi) {
      console.error("Backend API is not initialized");
      return;
    }

    try {
      backendApi.matching.matchingRecommendationAcceptedGet((error, data, response) => {
        if (error) {
          console.info("Error fetching adoptions:", error);
          return;
        }

        if (data && Array.isArray(data.payload)) {
          console.log("Fetched adoptions:", data);
          setMatchedRecommendations(data.payload);
        } else {
          console.error("Incorrect response for pet recommendation: ", data);
        }
      });
    } catch (error) {
      console.error("Error fetching next pet recommendation:", error);
    }
  }, [backendApi]);

  const handlePetSeection = (e) => {
    const { value } = e.target;
      console.info("Recommendation selected: ", e);

      if(value){
          const selectedRec = Array.isArray(matchedRecommendations) ? matchedRecommendations.find(r => r.id === value) : null;
          if(selectedRec){
              setSelectedRecommendation(selectedRec);
          }
      }
      handleInputChange(e)
  };
    return (
        <Form>
          {/* Pet Name */}
          <Form.Group controlId="formPetName">
            <Form.Label style={{fontWeight: "bold"}}>Pet Name</Form.Label>
            <Form.Control
                as="select"
                name="recommendationId"
                value={newApplication.id}
                onChange={handlePetSeection}
            >
              <option value="">Select Pet</option>
              {matchedRecommendations.map((rec) => (
                  <option key={rec.id} value={rec.id}>
                    {rec.pet.petName}, {rec.pet.petType}, {rec.pet.petGender}
                  </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Pet information */}
          <h3 className="text-center">Pet Profile</h3>
          {selectedRecommendation && (
              <PetProfile
                  attributeGroups={attributeGroups}
                  pet={selectedRecommendation.pet}
                  imageSrc={selectedRecommendation.pet.imageUrl ? backendApi.imagePath(selectedRecommendation.pet.imageUrl) : ''}
              />
          )}

            <h3 className="text-center">Adoption Details</h3>
            {/* Detailed Questions (Outside of Adopter Information) */}
            <Form.Group controlId="formHousingType" className="mt-2">
                <Form.Label style={{fontWeight: "bold"}}>Your Housing Type</Form.Label>
                <Form.Control
                    type="text"
                    name="housingType"
                value={newApplication.housingType}
                onChange={handleInputChange}
                placeholder="E.g., house, apartment, condo"
            />
          </Form.Group>

          <Form.Group controlId="formRentOrOwn" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Do you rent or own?</Form.Label>
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
                <Form.Label style={{fontWeight: "bold"}}>Landlord Contact Information</Form.Label>
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
            <Form.Label style={{fontWeight: "bold"}}>Do you have a fenced yard?</Form.Label>
            <Form.Control
                type="text"
                name="fencedYard"
                value={newApplication.fencedYard}
                onChange={handleInputChange}
                placeholder="Describe your yard or enter 'No'"
            />
          </Form.Group>


          <Form.Group controlId="formActiveLifestyle" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>How active is your lifestyle?</Form.Label>
            <Form.Control
                type="text"
                name="activeLifestyle"
                value={newApplication.activeLifestyle}
                onChange={handleInputChange}
                placeholder="E.g., very active, moderately active, quiet"
            />
          </Form.Group>

          <Form.Group controlId="formHoursAlone" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>How many hours will the pet be left alone daily?</Form.Label>
            <Form.Control
                type="number"
                name="hoursAlone"
                value={newApplication.hoursAlone}
                onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCrateTraining" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Do you plan to use crate training?</Form.Label>
            <Form.Control
                type="text"
                name="crateTraining"
                value={newApplication.crateTraining}
                onChange={handleInputChange}
                placeholder="Enter details or 'No'"
            />
          </Form.Group>

          <Form.Group controlId="formSleepingArrangements" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Where will the pet sleep?</Form.Label>
            <Form.Control
                type="text"
                name="sleepingArrangements"
                value={newApplication.sleepingArrangements}
                onChange={handleInputChange}
                placeholder="Describe sleeping arrangements"
            />
          </Form.Group>

          <Form.Group controlId="formPriorExperience" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Do you have prior experience with pets?</Form.Label>
            <Form.Control
                type="text"
                name="priorExperience"
                value={newApplication.priorExperience}
                onChange={handleInputChange}
                placeholder="Describe your experience or enter 'No'"
            />
          </Form.Group>

          <Form.Group controlId="formCurrentPets" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Do you have other pets? Please provide details.</Form.Label>
            <Form.Control
                type="text"
                name="currentPets"
                value={newApplication.currentPets}
                onChange={handleInputChange}
                placeholder="E.g., species, breed, age"
            />
          </Form.Group>

          <Form.Group controlId="formVetContact" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>Veterinarian Contact Information</Form.Label>
            <Form.Control
                type="text"
                name="vetContact"
                value={newApplication.vetContact}
                onChange={handleInputChange}
                placeholder="Enter vet's name and contact details"
            />
          </Form.Group>

          <Form.Group controlId="formExercisePlan" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>How will you exercise your pet?</Form.Label>
            <Form.Control
                type="text"
                name="exercisePlan"
                value={newApplication.exercisePlan}
                onChange={handleInputChange}
                placeholder="Describe your exercise plan"
            />
          </Form.Group>

          <Form.Group controlId="formGroomingPlan" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>How often will you groom your pet?</Form.Label>
            <Form.Control
                type="text"
                name="groomingPlan"
                value={newApplication.groomingPlan}
                onChange={handleInputChange}
                placeholder="Describe your grooming plan"
            />
          </Form.Group>

          <Form.Group controlId="formTravelPlan" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>What will you do with your pet when you travel?</Form.Label>
            <Form.Control
                type="text"
                name="travelPlan"
                value={newApplication.travelPlan}
                onChange={handleInputChange}
                placeholder="Describe your travel arrangements"
            />
          </Form.Group>

          <Form.Group controlId="formBehavioralExpectations" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>What are your behavioral expectations for your pet?</Form.Label>
            <Form.Control
                type="text"
                name="behavioralExpectations"
                value={newApplication.behavioralExpectations}
                onChange={handleInputChange}
                placeholder="Describe any traits or behaviors you expect or want to avoid"
            />
          </Form.Group>


          <Form.Group controlId="formReferences" className="mt-2">
            <Form.Label style={{fontWeight: "bold"}}>References (Please provide at least one)</Form.Label>
            <Form.Control
                as="textarea"
                rows={2}
                name="references"
                value={newApplication.references}
                onChange={handleInputChange}
                placeholder="Enter names and contact details of references"
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
        </Form>
    );
};

export default NewPetAdoptionApplication;
