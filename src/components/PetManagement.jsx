import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";



function PetManagement({ application, updateApplication, closeModal }) {

    const [userType, setUserType] = useState("");
  const [petName, setPetName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [petType, setPetType] = useState("animal");
  const [otherPetType, setOtherPetType] = useState("animal");
  const [breedType, setBreedType] = useState("");
  const [petColour, setPetColour] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petActivityLevel, setPetActivityLevel] = useState("");
  const [petEnvironment, setPetEnvironment] = useState("");
  const [petSocial, setPetSocial] = useState("");
  const [otherPetSocial, setOtherPetSocial] = useState("");
  const [userText, setUserText] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState(false);
  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current?.click();
  const [formData, setFormData] = useState(application);
  const [isSaving, setIsSaving] = useState(false);

    const shelterQuestions = {
        questionnaire: "Please Edit the Questionnaire to keep this Pet's information up to date!",
        gender: "What is the Gender of this Pet?",
        petType: "What type of pet is this?",
        breedType: "What is the breed of this pet?",
        petColour: "What colour is this pet?",
        petSize: "What size is this pet?",
        petActivityLevel: "How active is this pet?",
        petEnvironment: "What type of living environment suits this pet?",
        petSocial: "Is this pet social with other animals?",
        userText: "Does this pet have any behavioral challenges?",
      };

      const handleClick = (e) => {
        e.preventDefault();
        const formData = {
          adoptionStatus,
          petName,
          selectedGender,
          petType: petType === "other" ? otherPetType : petType,
          breedType,
          petColour,
          petSize,
          petActivityLevel,
          petEnvironment,
          petSocial: petSocial === "other animals" ? otherPetSocial : petSocial,
          userText,
          photo: selectedFile ? selectedFile.name : "No file selected",
        };
        console.log("Form data submitted:", formData);
        alert("Form submitted");
      };

      const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
          setSelectedFile(file);
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            setPreviewUrl(event.target.result); // set the preview URL to a data URI
          };
          fileReader.readAsDataURL(file); // convert file to base64 data URI
        }
      };
      
      const handleRemovePhoto = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
    
      const handlePetTypeChange = (e) => {
        if (e.target && e.target.value) {
            setPetType(e.target.value);
            if (e.target.value !== "other") setOtherPetType("animal");
          }
      };

      const handleAdoptionStatusChange = () => setAdoptionStatus(!adoptionStatus);

      const handleDeletePet = () => {
        // need to add delete the pet logic to remove from database
        console.log("Pet information deleted from the database.");
        alert("Pet removed from the system.");
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };


      useEffect(() => {
        setFormData(application); // Sync formData with the selected application
      }, [application]);
      

      const handleSave = () => {
        if (!formData.petName || !formData.petType || !formData.petGender) {
          alert("Please fill in all required fields.");
          return;
        }
      
        // If `id` already exists in the table, update the existing row
        if (application && application.id) {
          updateApplication({ ...formData });
        } else {
          // Create a new pet profile
          updateApplication({ ...formData, id: Date.now() }); // Use a unique ID
        }
      
        closeModal(); // Close the modal after saving
      };
      
      
      
      
      

    return(
        <>
    <h1 className={styles.title}>Pet Profile Management</h1>
        <div class={styles.quesWrap}>
            <form > {/* deleted onSubmit={handleClick} */}
        <p style={{ color: "#1e6262", marginBottom: "3%" }}>
          {shelterQuestions.questionnaire}
        </p>
        <br />
        <label className={styles.mylabel}>Upload or Change your Profile Picture:</label>
      <br />
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={handleUploadClick}
      >
        Please select a photo to upload
      </button>

      {selectedFile && (
        <div className="ms-5">
          <br />
          <label className={styles.mylabel}>
            Selected File: {selectedFile.name}
          </label>
          <br />
          <img src={previewUrl || ""} alt="Preview" style={{ width: "200px" }} />
          <button
            type="button"
            className="btn btn-danger ms-5"
            onClick={handleRemovePhoto}
          >
            Remove Photo
          </button>
          <br />
          <br />
        </div>
      )}
            <br /><br /><br />
            <label className={styles.mylabel}>Adoption Status</label>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={adoptionStatus}
                        onChange={handleAdoptionStatusChange}
                    />
                     <label className="form-check-label">
                        {adoptionStatus ? "Adopted" : "Available"}
                    </label>
                </div>

            <br /> <br />
            <label className={styles.mylabel}>What is the name of this Pet?</label>
          <input
            className="form-control"
            name="petName"
            value={formData.petName}
            onChange={handleInputChange}
          />
          <br />
            <Questionnaire
          questions={shelterQuestions}
          formData={formData}
          handleInputChange={handleInputChange}
          // petName={petName}
          // setPetName={setPetName}
          // selectedGender={formData.selectedGender}
          //   setSelectedGender={(value) =>
          //     setFormData((prev) => ({ ...prev, selectedGender: value }))
          //   }
          // petType={petType}
          // setPetType={setPetType}
          // otherPetType={otherPetType}
          // setOtherPetType={setOtherPetType}
          // breedType={breedType}
          // setBreedType={setBreedType}
          // petColour={petColour}
          // setPetColour={setPetColour}
          // petSize={petSize}
          // setPetSize={setPetSize}
          // petActivityLevel={petActivityLevel}
          // setPetActivityLevel={setPetActivityLevel}
          // petEnvironment={petEnvironment}
          // setPetEnvironment={setPetEnvironment}
          // petSocial={petSocial}
          // setPetSocial={setPetSocial}
          // otherPetSocial={otherPetSocial}
          // setOtherPetSocial={setOtherPetSocial}
          // userText={userText}
          // setUserText={setUserText}
        />
        <br />
        <div className={styles.buttonContainer}>
        <button
          type="button"
          className="btn btn-success mt-3 ms-4 xl"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

          <button
            type="button"
            className="btn btn-danger mt-3 ms-4 xl"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        </form>
        </div>
        </>
    );
}

export default PetManagement;