import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";
import AuthContext from "../context/AuthContext";
import { initBackendApi } from "./BackendApi";

// Component for managing the pet's profile information, including uploading a photo and editing details
function PetManagement({
  petProfile,
  updateApplication,
  closeModal,
  attributeGroups,
}) {
  // Get the authentication token from context
  const { token } = useContext(AuthContext);

  // Initialize state for the backend API
  const [backendApi, setBackendApi] = useState(null);

  // Effect hook to initialize backend API instance when token is available
  useEffect(() => {
    if (token) {
      const apiInstance = initBackendApi(token);
      setBackendApi(apiInstance);
    }
  }, [token]);

  // States for managing
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState(false);

  // Ref for file input to trigger file selection
  const fileInputRef = useRef(null);

  // Trigger file input click event
  const handleUploadClick = () => fileInputRef.current?.click();

  // Initialize form data with existing pet profile
  const [formData, setFormData] = useState(petProfile);
  // State for save button's loading state
  const [isSaving, setIsSaving] = useState(false);

  // Handle file input change (i.e., when user selects an image file)
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (backendApi && file) {
      setSelectedFile(file);
      try {
        // Use the backendApi client to upload the image
        await new Promise((resolve, reject) => {
          backendApi.pet.petUploadImagePost(file, (error, data, response) => {
            if (error) {
              reject(error);
            } else if (data && data.payload) {
              const imageUrl = backendApi.imagePath(data.payload);
              setPreviewUrl(imageUrl);
              petProfile.imageUrl = data.payload; // Store the image URL for form submission
              resolve(data);
            } else {
              console.error("Incorrect API response: " + data);
            }
          });
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }
    }
  };

  // Handle remove photo action (clear selected file and preview)
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Toggle adoption status between "Adopted" and "Available"
  const handleAdoptionStatusChange = () => setAdoptionStatus(!adoptionStatus);

  // Handle changes in the form inputs (name and attributes)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "", // Ensure the key always exists with a default value
    }));
  };

  // Update preview URL when form data or image URL changes
  useEffect(() => {
    if (backendApi && formData && formData.imageUrl) {
      setPreviewUrl(backendApi.imagePath(formData.imageUrl));
    }
  }, [backendApi, formData]);

  // Save changes to the pet profile and close the modal
  const handleSave = () => {
    if (
      !formData ||
      !formData.petName ||
      !formData.petType ||
      !formData.petGender
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    updateApplication({ ...formData }); // Call update application with form data
    closeModal(); // Close the modal after saving
  };

  return (
    <>
      <h1 className={styles.title}>Pet Profile Management</h1>
      <div className={styles.quesWrap}>
        <form>
          {" "}
          {/* deleted onSubmit={handleClick} */}
          <p style={{ color: "#1e6262", marginBottom: "3%" }}>
            Please Edit the Questionnaire to keep this Pet's information up to
            date!
          </p>
          <br />
          <label className={styles.mylabel}>
            Upload or Change your Profile Picture:
          </label>
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
          {previewUrl && (
            <div className="ms-5">
              <br />
              <label className={styles.mylabel}>
                Selected File: {selectedFile ? selectedFile.name : ""}
              </label>
              <br />
              <img
                src={previewUrl || ""}
                alt="Preview"
                style={{ width: "200px" }}
              />
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
          <label className={styles.mylabel}>
            What is the name of this Pet?
          </label>
          <input
            className="form-control"
            name="petName"
            value={formData ? formData.petName : ""}
            onChange={handleInputChange}
          />
          <br />
          <Questionnaire
            attributeGroups={attributeGroups}
            formData={formData}
            handleInputChange={handleInputChange}
            multivalue={false}
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
