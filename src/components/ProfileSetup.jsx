import React, { useRef, useState } from "react";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";
import ShelterRegistration from "./ShelterRegistration";
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';  // Import NavbarComponent
import { initBackendApi } from "./BackendApi";

function ProfileSetup() {
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
  const fileInputRef = useRef(null);
  const handleUserTypeChange = (event) => setUserType(event.target.value);
//   const handleRadioChange = (e) => setSelectedGender(e.target.value);
  const handleUploadClick = () => fileInputRef.current?.click();
//   const handleOtherPetTypeChange = (e) => setOtherPetType(e.target.value);
//   const finalPetType = petType === "other" ? otherPetType : petType;
//   const handleBreedTypeChange = (e) => setBreedType(e.target.value);
//   const handlePetColourChange = (e) => setPetColour(e.target.value);
//   const handlePetSizeChange = (e) => setPetSize(e.target.value);
//   const handlePetActivityChange = (e) => setPetActivityLevel(e.target.value);
//   const handlePetEnvironmentChange = (e) => setPetEnvironment(e.target.value);
//   const handlePetSocialChange = (e) => setPetSocial(e.target.value);
//   const handleOtherPetSocialChange = (e) => setOtherPetSocial(e.target.value);
//   const handleUserTextChange = (e) => setUserText(e.target.value);

// Adopter-specific fields
const [shelterName, setShelterName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [province, setProvince] = useState("");
const [postalCode, setPostalCode] = useState("");

  const backendApi = initBackendApi();

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



  // Adopter-specific labels for questions
  const adopterQuestions = {
    questionnaire: "Please Complete the Questionnaire to start matching with Pets!",
    gender: "What is the preferred Gender for your pet?",
    petType: "What type of pet are you interested in adopting?",
    breedType: "Do you have a preferred breed?",
    petColour: "Do you have a preferred pet colour?",
    petSize: "What size of pet are you interested in?",
    petActivityLevel: "What activity level do you prefer in a pet?",
    petEnvironment: "What is your living environment like?",
    petSocial: "Do you have other pets at home?",
    userText: "Any additional preferences or comments?",
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (userType === "adopter") {
      const userUpdateRequest = new UserUpdateContactsPutRequest({
        lastName,
        email,
        phone,
        address,
        city,
        province,
        postalCode,
      });

      await new Promise((resolve, reject) => {
        backendApi.user.userUpdateProfilePut(userUpdateRequest, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });


      console.log("Adopter contacts updated successfully.");

      // 2. Submit Adopter Preferences
      const adopterPreferences = new AdopterPreferencesPostRequest({
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
        // Include other fields as required
      });

      await new Promise((resolve, reject) => {
        backendApi.user.userPreferencesPost(adopterPreferences, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      console.log("Adopter preferences submitted successfully.");
      alert("Adopter profile and preferences submitted successfully!");

      // Optionally, reset form fields or redirect the user
      resetForm();
    } else if (userType === "shelter") {
      // 1. Update Shelter Contact Information
      const shelterUpdateRequest = new ShelterUpdateContactsPutRequest({
        shelterName,
        email,
        phone,
        address,
        city,
        province,
        postalCode,
      });


      console.log("Shelter contacts updated successfully.");

      // 2. Submit Shelter Pet Information
      // Assuming ShelterAddPetPostRequest requires pet details and possibly a photo URL
      const shelterAddPetRequest = new ShelterAddPetPostRequest({
        // Populate with necessary pet information
        petName,
        petType: petType === "other" ? otherPetType : petType,
        breedType,
        petColour,
        petSize,
        petActivityLevel,
        petEnvironment,
        petSocial: petSocial === "other animals" ? otherPetSocial : petSocial,
        userText,
        // Include other fields as required
        // For photo, handle file upload separately (see below)
      });

      // If photo upload is required, handle it before making the request
      let photoUrl = "";
      if (selectedFile) {
        photoUrl = await uploadFile(selectedFile);
        shelterAddPetRequest.photoUrl = photoUrl;  // Adjust based on API's expected field
      }

      await new Promise((resolve, reject) => {
        api.shelterAddPetPost(shelterAddPetRequest, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      console.log("Shelter pet information submitted successfully.");
      alert("Shelter profile and pet information submitted successfully!");
    }
  };

  


  return (
    <>
    <NavbarComponent userRole="guest" />
    <h1 className={styles.title}>Profile & Preferences</h1>
    <div className={styles.quesWrap}>
      <form onSubmit={handleClick}>
        <div>
          <label className={styles.mylabel} htmlFor="userType">
            Are you an adopter or shelter?
          </label>
          <select
            id="userType"
            value={userType}
            onChange={handleUserTypeChange}
            className="form-select mb-3"
          >
            <option value="" disabled>
              Please Choose...
            </option>
            <option value="adopter">Adopter</option>
            <option value="shelter">Shelter</option>
          </select>
        </div>
        <br />

        {userType === "shelter" && (
           <ShelterRegistration
           shelterName={shelterName}
          setShelterName={setShelterName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          province={province}
          setProvince={setProvince}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
           handleFileChange={handleFileChange}
           previewUrl={previewUrl}
           handleRemovePhoto={handleRemovePhoto}
           handleUploadClick={handleUploadClick}
           fileInputRef={fileInputRef}
           selectedFile={selectedFile}
         />
        )}

        {userType === "adopter" && (
          <>
          <label className={styles.mylabelQuestionnaire}>
          Questionnaire
        </label>
        <p style={{ color: "#1e6262", marginBottom: "3%" }}>
          {adopterQuestions.questionnaire}
        </p>
          <Questionnaire
          questions={adopterQuestions}
          petName={petName}
          setPetName={setPetName}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          petType={petType}
          setPetType={setPetType}
          otherPetType={otherPetType}
          setOtherPetType={setOtherPetType}
          breedType={breedType}
          setBreedType={setBreedType}
          petColour={petColour}
          setPetColour={setPetColour}
          petSize={petSize}
          setPetSize={setPetSize}
          petActivityLevel={petActivityLevel}
          setPetActivityLevel={setPetActivityLevel}
          petEnvironment={petEnvironment}
          setPetEnvironment={setPetEnvironment}
          petSocial={petSocial}
          setPetSocial={setPetSocial}
          otherPetSocial={otherPetSocial}
          setOtherPetSocial={setOtherPetSocial}
          userText={userText}
          setUserText={setUserText}
        />
        </>
        )}

        <div className={styles.buttonContainer}>
          <button
            className="btn btn-success btn-lg mt-3"
            onClick={handleClick}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    {/* Footer */}
    <FooterComponent />
  </>
  );
}

export default ProfileSetup;
