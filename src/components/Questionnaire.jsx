import React from "react";
import styles from "../styles/ProfileSetup.module.css";

function Questionnaire({
  questions,
  showPetName = false,
  petName,
  setPetName,
  selectedGender,
  setSelectedGender,
  fileInputRef,
  handleFileChange,
  previewUrl,
  handleRemovePhoto,
  handleUploadClick,
  selectedFile,
  petType,
  setPetType,
  otherPetType,
  setOtherPetType,
  breedType,
  setBreedType,
  petColour,
  setPetColour,
  petSize,
  setPetSize,
  petActivityLevel,
  setPetActivityLevel,
  petEnvironment,
  setPetEnvironment,
  petSocial,
  setPetSocial,
  otherPetSocial,
  setOtherPetSocial,
  userText,
  setUserText,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  address,
  setAddress,
  city,
  setCity,
  province,
  setProvince,
  postalCode,
  setPostalCode,
}) {
  return (
    <div>
      {showPetName ? (
        <>
        <div>
          <label className={styles.mylabel}>Pet's Name:</label>
          <input
            className="form-control"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <br />
          <br />
        </div>
      

      <label className={styles.mylabel}>Gender:</label>
      <br />
      <label className="me-5">
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={() => setSelectedGender("male")}
          checked={selectedGender === "male"}
          className="me-1"
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={() => setSelectedGender("female")}
          checked={selectedGender === "female"}
          className="me-1"
        />
        Female
      </label>
      <br />
      <br />
      <br />
      </>
    ) : (
        <>
            <label className={styles.mylabel}>First Name:</label>
          <input
            className="form-control"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Last Name:</label>
          <input
            className="form-control"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Email:</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Phone:</label>
          <input
            className="form-control"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Address:</label>
          <input
            className="form-control"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>City:</label>
          <input
            className="form-control"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Province:</label>
          <input
            className="form-control"
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Postal Code:</label>
          <input
            className="form-control"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <br />
        </>
    )}
      <label className={styles.mylabel}>Upload Photo:</label>
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
      <br />
      <br />
      <br />

      <label className={styles.mylabelQuestionnaire}>
        Questionnaire
      </label>
      <p style={{ color: "#1e6262", marginBottom: "3%" }}>
        Please Complete the Questionnaire to start matching with Adopters!
      </p>

      <label className={styles.mylabel}>{questions.petType}</label>
      <br />
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="cat"
          className="me-1"
          checked={petType === "cat"}
          onChange={(e) => setPetType(e.target.value)}
        /> Cat
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="dog"
          className="me-1"
          checked={petType === "dog"}
          onChange={(e) => setPetType(e.target.value)}
        /> Dog
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="rabbit"
          className="me-1"
          checked={petType === "rabbit"}
          onChange={(e) => setPetType(e.target.value)}
        /> Rabbit
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="other"
          className="me-1"
          checked={petType === "other"}
          onChange={(e) => setPetType(e.target.value)}
        /> Other
        {petType === "other" && (
          <input
            type="text"
            name="otherPetType"
            value={otherPetType}
            onChange={(e) => setOtherPetType(e.target.value)}
            className="ms-2"
            placeholder="Specify pet type"
          />
        )}
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
       {questions.breedType}
      </label>
      <br />
      <input
        type="text"
        name="petBreedType"
        value={breedType}
        onChange={(e) => setBreedType(e.target.value)}
        placeholder="Enter Breed Type"
      />
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        {questions.petColour}
      </label>
      <br />
      <input
        type="text"
        name="petColour"
        value={petColour}
        onChange={(e) => setPetColour(e.target.value)}
        placeholder="Enter Pet Colour"
      />
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        {questions.petSize}
      </label>
      <br />
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSize"
          value="small"
          onChange={() => setPetSize("small")}
          checked={petSize === "small"}
          className="me-1"
        /> Small (&lt; 20 Lbs)
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSize"
          value="medium"
          onChange={() => setPetSize("medium")}
          checked={petSize === "medium"}
          className="me-1"
        /> Medium (20 - 49 Lbs)
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSize"
          value="large"
          onChange={() => setPetSize("large")}
          checked={petSize === "large"}
          className="me-1"
        /> Large (50+ Lbs)
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
       {questions.petActivityLevel}
      </label>
      <br />
      <label className="me-3" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petActivityLevel"
          value="very active"
          onChange={() => setPetActivityLevel("very active")}
          checked={petActivityLevel === "very active"}
          className="me-1"
        /> Very Active
      </label>
      <label className="me-3" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petActivityLevel"
          value="active"
          onChange={() => setPetActivityLevel("active")}
          checked={petActivityLevel === "active"}
          className="me-1"
        /> Active
      </label>
      <label className="me-3" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petActivityLevel"
          value="quiet"
          onChange={() => setPetActivityLevel("quiet")}
          checked={petActivityLevel === "quiet"}
          className="me-1"
        /> Quiet
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        {questions.petEnvironment}
      </label>
      <br />
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petEnvironment"
          value="apartment"
          onChange={() => setPetEnvironment("apartment")}
          checked={petEnvironment === "apartment"}
          className="me-1"
        /> Apartment
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petEnvironment"
          value="house"
          onChange={() => setPetEnvironment("house")}
          checked={petEnvironment === "house"}
          className="me-1"
        /> House
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petEnvironment"
          value="farm property"
          onChange={() => setPetEnvironment("farm property")}
          checked={petEnvironment === "farm property"}
          className="me-1"
        /> Farm Property
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        {questions.petSocial}
      </label>
      <br />
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSocial"
          value="cats"
          onChange={() => setPetSocial("cats")}
          checked={petSocial === "cats"}
          className="me-1"
        /> Cats Only
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSocial"
          value="dogs"
          onChange={() => setPetSocial("dogs")}
          checked={petSocial === "dogs"}
          className="me-1"
        /> Dogs Only
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSocial"
          value="all animals"
          onChange={() => setPetSocial("all animals")}
          checked={petSocial === "all animals"}
          className="me-1"
        /> All Animals
      </label>
      <label className="me-4 mt-2" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSocial"
          value="other animals"
          onChange={() => setPetSocial("other animals")}
          checked={petSocial === "other animals"}
          className="me-1"
        /> Other Animals Only
        {petSocial === "other animals" && (
          <input
            type="text"
            placeholder="Please specify"
            value={otherPetSocial}
            onChange={(e) => setOtherPetSocial(e.target.value)}
            className="ms-3"
          />
        )}
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        {questions.userText}
      </label>
      <br />
      <textarea
        id="textArea"
        rows={5}
        cols={100}
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        placeholder="Describe animal behaviour here..."
      ></textarea>
    </div>
  );
}

export default Questionnaire;
