import React from "react";
import styles from "../styles/ProfileSetup.module.css";

function Questionnaire({
  questions,
  formData, 
  handleInputChange
}) {
  return (
        <>
          

      <label className={styles.mylabel}>{questions.gender}</label>
      <br />
      <label className="me-5">
        <input
          type="radio"
          name="petGender"
          value="male"
          onChange={handleInputChange}
          checked={formData.petGender === "male" || false}
          className="me-1"
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="petGender"
          value="female"
          onChange={handleInputChange}
          checked={formData.petGender === "female" || false}
          className="me-1"
        />
        Female
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>{questions.petType}</label>
      <br />
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="cat"
          className="me-1"
          checked={formData.petType === "cat" || false}
          onChange={handleInputChange}
        /> Cat
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="dog"
          className="me-1"
          checked={formData.petType === "dog" || false}
          onChange={handleInputChange}
        /> Dog
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="rabbit"
          className="me-1"
          checked={formData.petType === "rabbit" || false}
          onChange={handleInputChange}
        /> Rabbit
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petType"
          value="other"
          className="me-1"
          checked={formData.petType === "other" || false}
          onChange={handleInputChange}
        /> Other
        {formData.petType === "other" && (
          <input
            type="text"
            name="otherPetType"
            value={formData.otherPetType}
            onChange={handleInputChange}
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
        name="petBreed"
        value={formData.petBreed || ''}
        onChange={handleInputChange}
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
        value={formData.petColour || ''}
        onChange={handleInputChange}
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
          onChange={handleInputChange}
          checked={formData.petSize === "small" || false}
          className="me-1"
        /> Small (&lt; 20 Lbs)
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSize"
          value="medium"
          onChange={handleInputChange}
          checked={formData.petSize === "medium" || false}
          className="me-1"
        /> Medium (20 - 49 Lbs)
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petSize"
          value="large"
          onChange={handleInputChange}
          checked={formData.petSize === "large" || false}
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
          onChange={handleInputChange}
          checked={formData.petActivityLevel === "very active" || false}
          className="me-1"
        /> Very Active
      </label>
      <label className="me-3" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petActivityLevel"
          value="active"
          onChange={handleInputChange}
          checked={formData.petActivityLevel === "active" || false}
          className="me-1"
        /> Active
      </label>
      <label className="me-3" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petActivityLevel"
          value="quiet"
          onChange={handleInputChange}
          checked={formData.petActivityLevel === "quiet" || false}
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
          onChange={handleInputChange}
          checked={formData.petEnvironment === "apartment" || false}
          className="me-1"
        /> Apartment
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petEnvironment"
          value="house"
          onChange={handleInputChange}
          checked={formData.petEnvironment === "house" || false}
          className="me-1"
        /> House
      </label>
      <label className="me-4" style={{ color: "#1e6262" }}>
        <input
          type="radio"
          name="petEnvironment"
          value="farm property"
          onChange={handleInputChange}
          checked={formData.petEnvironment === "farm property" || false}
          className="me-1"
        /> Farm Property
      </label>
      <br />
      <br />
      <br />

      <label className={styles.mylabel}>
        What is the pet's age?
      </label>
      <br />
      <input
        type="number"
        name="petAge"
        value={formData.petAge}
        onChange={handleInputChange} // Ensure updates to petBirthday
        className="form-control"
      />
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
        value={formData.userText}
        onChange={handleInputChange}
        placeholder="Describe animal behaviour here..."
      ></textarea>
        </>
  );
}

export default Questionnaire;
