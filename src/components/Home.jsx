import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap"; // Make sure Row and Col are imported
import NavbarComponent from "./NavbarComponent";
import AdopterView from "./AdopterView";
import ShelterView from "./ShelterView";
import "../styles/Home.css";
import petsImage from "../assets/images/pets.jpg";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import { initBackendApi } from "./BackendApi";
import AuthContext from "../context/AuthContext";

const Home = () => {

  const { userRole } = useContext(AuthContext);

  const backendApi = initBackendApi();
  const [reviews, setReviews] = useState([]);

  useEffect(() => fetchReviews(), []);

  const fetchReviews = () => {
    const N = 6; // Number of stories to fetch
    backendApi.adoption.adoptionStoryGet({ N }, (error, data, response) => {
      if (error) {
        console.error("Error fetching adoption stories:", error);
      } else if(data && Array.isArray(data.payload)){
        setReviews(data.payload);
      } else {
        console.error("Incorrect data received:", data);
      }
    });
  };

  return (
    <div id="root">
      {/* Navbar */}
      <NavbarComponent/>

      {/* Main Content */}
      <div className="flex-grow-1 text-center mt-4">
        {userRole === "guest" && (
          <>
            <Container className="text-center mt-4">
              <h1>Welcome to Pet Adoption Platform!</h1>
              <p>
                Please <Link to="/register">Register</Link> or{" "}
                <Link to="/login">Log in</Link> to explore more features.
              </p>
              <div className="img-container">
                <img src={petsImage} alt="Pets" className="img-fluid" />
              </div>
            </Container>

            <p
              style={{
                borderTop: "3px solid rgba(45, 118, 127, 0.7)", // Thicker line with 50% opacity
                width: "50%", // Centered at 50% width
                margin: "40px auto 0 auto", // 20px top margin, centered
              }}
            />

            {/* Adoption Success Stories */}
            <Container className="mt-5 mb-5">
              <h2>Adoption Success Stories</h2>
              <Row className="mt-4">
                {reviews.map((review, index) => (
                  <Col md={4} key={index}>
                    <ReviewCard
                      title={review.title}
                      story={review.text}
                      author={review.author}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        )}

        {userRole === "adopter" && <AdopterView />}
        {userRole === "shelter" && <ShelterView />}
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Home;
