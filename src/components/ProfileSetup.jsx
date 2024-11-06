import React, { useRef, useState } from "react";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";

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
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [province, setProvince] = useState("");
const [postalCode, setPostalCode] = useState("");

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

  const shelterQuestions = {
    petType: "What type of pet is this?",
    breedType: "What is the breed of this pet?",
    petColour: "What colour is this pet?",
    petSize: "What size is this pet?",
    petActivityLevel: "How active is this pet?",
    petEnvironment: "What type of living environment suits this pet?",
    petSocial: "Is this pet social with other animals?",
    userText: "Does this pet have any behavioral challenges?",
  };

  // Adopter-specific labels for questions
  const adopterQuestions = {
    petType: "What type of pet are you interested in adopting?",
    breedType: "Do you have a preferred breed?",
    petColour: "Do you have a preferred pet colour?",
    petSize: "What size of pet are you interested in?",
    petActivityLevel: "What activity level do you prefer in a pet?",
    petEnvironment: "What is your living environment like?",
    petSocial: "Do you have other pets at home?",
    userText: "Any additional preferences or comments?",
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = {
      userType,
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
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      postalCode,
      photo: selectedFile ? selectedFile.name : "No file selected"
    };
    console.log("Form data submitted:", formData);
    alert("Form submitted");
  };


  


  return (
    <>
    <h1 className={styles.title}>Register</h1>
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
           <Questionnaire
           questions={shelterQuestions}
           showPetName={true}
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
           handleFileChange={handleFileChange}
           previewUrl={previewUrl}
           handleRemovePhoto={handleRemovePhoto}
           handleUploadClick={handleUploadClick}
           fileInputRef={fileInputRef}
           selectedFile={selectedFile}
         />
        )}

        {userType === "adopter" && (
          <Questionnaire
          questions={adopterQuestions}
          showPetName={false}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
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
          handleFileChange={handleFileChange}
          previewUrl={previewUrl}
          handleRemovePhoto={handleRemovePhoto}
          handleUploadClick={handleUploadClick}
          fileInputRef={fileInputRef}
          selectedFile={selectedFile}
        />
        )}

        <div className={styles.buttonContainer}>
          <button
            className="btn btn-success btn-lg mt-3"
            onClick={handleClick}
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </>
  );
}

export default ProfileSetup;
