import React, { useRef, useState } from "react";
import styles from "../styles/ProfileSetup.module.css";

function ShelterRegistration ({
  shelterName,
  setShelterName,
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
  fileInputRef,
  handleFileChange,
  previewUrl,
  handleRemovePhoto,
  handleUploadClick,
  selectedFile,
}) {

    return(
        
        <>
            <label className={styles.mylabel}>Upload your Shelter Profile Picture:</label>
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
          <label className={styles.mylabel}>What is the name of your Shelter?</label>
          <input
            className="form-control"
            type="text"
            value={shelterName}
            onChange={(e) => setShelterName(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>What is your Shelter's phone number?</label>
          <input
            className="form-control"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />

          <label className={styles.mylabel}>Please enter the Shelter's address:</label>
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
    );
}

export default ShelterRegistration;