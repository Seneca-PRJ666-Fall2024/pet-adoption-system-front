import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styles from "../styles/ProfileSetup.module.css";
import Questionnaire from "./Questionnaire";
import ShelterRegistration from "./ShelterRegistration";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent"; // Import NavbarComponent
import { initBackendApi } from "./BackendApi";

function ProfileSetup() {
  // Retrieve the current user's role and token from AuthContext
  const { userRole, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize backend API
  const [backendApi, setBackendApi] = useState(null);

  // Initialize the backend API with token when component mounts or token changes
  useEffect(() => {
    if (token) {
      setBackendApi(initBackendApi(token));
    }
  }, [token]);

  // States for managing file selection, preview, and user details
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Add this state to store the image URL
  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current?.click();

  // States for managing user profile fields (email, username, etc.)
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // State for storing form data (preferences for adopter)
  const [formData, setFormData] = useState({});

  // State for managing attribute groups (used in questionnaire for adopters)
  const [attributeGroups, setAttributeGroups] = useState([]);

  // Fetch the user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await new Promise((resolve, reject) => {
          backendApi.user.userGetProfileGet((error, data, response) => {
            if (error) {
              reject(error);
            } else if (data && data.payload) {
              const profile = data.payload;

              // Set state variables based on the fetched profile
              setEmail(profile.email || "");
              setUserName(profile.username || "");
              setPhone(profile.phone || "");
              setAddress(profile.address || "");
              setCity(profile.city || "");
              setProvince(profile.province || "");
              setPostalCode(profile.postalCode || "");
              setImageUrl(profile.imageUrl || "");

              // Set preview URL for the image if available
              if (profile.imageUrl) {
                setPreviewUrl(backendApi.imagePath(profile.imageUrl));
              }
              if (profile.preferences) {
                setFormData(profile.preferences);
              }
              resolve(data);
            } else {
              console.error("Incorrect API response: " + data);
            }
          });
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    if (backendApi) {
      fetchUserProfile(); // Fetch user profile
      if (userRole === "adopter") {
        loadAttributeGroups(); // Load attribute groups for adopter
      }
    }
  }, [backendApi]);

  // Handle image file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file

      try {
        // Use the backend API to upload the selected image
        await new Promise((resolve, reject) => {
          backendApi.user.userUploadImagePost(file, (error, data, response) => {
            if (error) {
              reject(error);
            } else if (data && data.payload) {
              const imageUrl = backendApi.imagePath(data.payload);
              setPreviewUrl(imageUrl);
              setImageUrl(data.payload); // Store the image URL for form submission
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

  // Remove the selected image and reset related states
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle form input changes (for text inputs and checkboxes)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        const currentValues = Array.isArray(prev[name]) ? prev[name] : [];
        return {
          ...prev,
          [name]: checked
            ? [...currentValues, value] // Add the value if checked
            : currentValues.filter((item) => item !== value), // Remove the value if unchecked
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
      // Default case (if needed for other input types)
      return prev;
    });
  };

  // Submit adopter preferences to the backend
  const updateUserPreferences = async (formData) => {
    const wrappedFormData = Object.fromEntries(
      Object.entries(formData)
        .filter(
          ([_, value]) => value !== null && value !== undefined && value !== ""
        )
        .map(([key, value]) =>
          Array.isArray(value) ? [key, value] : [key, value.split(",")]
        )
    );

    try {
      await new Promise((resolve, reject) => {
        backendApi.user.userPreferencesPost(
          wrappedFormData,
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });

      console.log("Adopter preferences submitted successfully.");
    } catch (error) {
      console.error("API call failed:", error.message);
      throw new Error("Failed to update adopter preferences: " + error.message);
    }
  };

  // Fetch the attribute groups for adopter preferences
  const loadAttributeGroups = async () => {
    try {
      await new Promise((resolve, reject) => {
        backendApi.pet.petAttributesGet((error, data, response) => {
          if (error) {
            reject(error);
          } else {
            setAttributeGroups(data.payload);
            resolve(data);
          }
        });
      });

      console.log("Attribute groups loaded successfully.");
    } catch (error) {
      console.error("API call failed:", error.message);
      throw new Error("Failed to load attribute groups: " + error.message);
    }
  };

  // Update the user profile with new data
  const updateUserProfile = async (userData) => {
    try {
      await new Promise((resolve, reject) => {
        backendApi.user.userUpdateProfilePut(
          userData,
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });

      console.log("User profile updated successfully.");
    } catch (error) {
      console.error("API call failed:", error.message);
      throw new Error("Failed to update user profile: " + error.message);
    }
  };

  // Handle form submission (save profile and preferences)
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile({
        email: email,
        imageUrl: imageUrl,
        username: userName,
        phone: phone,
        address: address,
        city: city,
        province: province,
        postalCode: postalCode,
      });
      alert("Profile information submitted successfully!");
      if (userRole === "adopter") {
        await updateUserPreferences(formData);
        alert("Adopter preferences submitted successfully!");
      }

      navigate("/"); // Navigate to home page after successful submission
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <NavbarComponent />
      <h1 className={styles.title}>Profile & Preferences</h1>
      <div className={styles.quesWrap}>
        <form onSubmit={handleClick}>
          {userRole === "shelter" && (
            <ShelterRegistration
              shelterName={userName}
              setShelterName={setUserName}
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

          {userRole === "adopter" && (
            <>
              <label className={styles.mylabel}>
                Upload your Profile Picture:
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
                    Selected File:{" "}
                    {selectedFile ? selectedFile.name : previewUrl}
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
              <label className={styles.mylabel}>What is your email?</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label className={styles.mylabel}>What is your name?</label>
              <input
                className="form-control"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />

              <label className={styles.mylabel}>
                What is your phone number?
              </label>
              <input
                className="form-control"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />

              <label className={styles.mylabel}>
                Please enter your address:
              </label>
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

              <label className={styles.mylabelQuestionnaire}>
                Questionnaire
              </label>
              <p style={{ color: "#1e6262", marginBottom: "3%" }}>
                Please Complete the Questionnaire to start matching with Pets!
              </p>
              <Questionnaire
                attributeGroups={attributeGroups}
                formData={formData}
                handleInputChange={handleInputChange}
                multivalue={true}
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
