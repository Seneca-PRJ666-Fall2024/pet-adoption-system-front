import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";
import ShelterRegistration from "./ShelterRegistration";
import FooterComponent from './FooterComponent';
import NavbarComponent from './NavbarComponent';  // Import NavbarComponent
import { initBackendApi } from "./BackendApi";
import UserUpdateProfilePutRequest from "../../api-client/src/model/UserUpdateProfilePutRequest";

function ProfileSetup() {

  const { userRole, token } = useContext(AuthContext);
  const navigate = useNavigate();

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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const backendApi = initBackendApi(token);

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

  const toArray = (value) => {
    // If the value is already an array, return it; otherwise, wrap it in an array
    if(!value || value === "")
      return null;
    else {
      return Array.isArray(value) ? value : [value];
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (userRole === "adopter") {

      const adopterPreferences = new Object({
        gender: toArray(selectedGender),
        petType: toArray(petType === "other" ? otherPetType : petType),
        breedType: toArray(breedType),
        petColour: toArray(petColour),
        petSize: toArray(petSize),
        petActivityLevel: toArray(petActivityLevel),
        petEnvironment: toArray(petEnvironment),
        petSocial: toArray(petSocial === "other animals" ? otherPetSocial : petSocial),
        // Include other fields as required
      });

      try {
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
        navigate('/');
      } catch (error) {
        console.error("API call failed:", error.message);
        alert("API call failed: " + error.message);
        // Handle the error (e.g., display a user-friendly message or retry the request)
      }

    } else if (userRole === "shelter") {
      // 1. Update Shelter Contact Information
      const userUpdateRequest = new UserUpdateProfilePutRequest({
        name: shelterName,
        phone: phone,
        address: address + ", " + "city" + ", " + "province" + ", " + postalCode
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

      console.log("Shelter pet information submitted successfully.");
      alert("Shelter profile and pet information submitted successfully!");

      navigate('/');
    }
  };

  


  return (
    <>
    <NavbarComponent/>
    <h1 className={styles.title}>Profile & Preferences</h1>
    <div className={styles.quesWrap}>
      <form onSubmit={handleClick}>

        {userRole === "shelter" && (
           <ShelterRegistration
           shelterName={shelterName}
          setShelterName={setShelterName}
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

        {userRole === "adopter" && (
          <>
          <label className={styles.mylabelQuestionnaire}>
          Questionnaire
        </label>
        <p style={{ color: "#1e6262", marginBottom: "3%" }}>
          {adopterQuestions.questionnaire}
        </p>
          <Questionnaire
          questions={adopterQuestions}
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
