import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';  // Make sure Row and Col are imported
import NavbarComponent from './NavbarComponent';
import AdopterView from './AdopterView';
import ShelterView from './ShelterView';
import '../styles/Home.css';
import petsImage from '../assets/images/pets.jpg';
import ReviewCard from './ReviewCard';  // Import the ReviewCard component
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import FooterComponent from './FooterComponent';  // Import the FooterComponent

const Home = () => {
  const [userRole, setUserRole] = useState('guest'); // guest is the default state

  // Handlers to switch roles (for demo purposes)
  const loginAsAdopter = () => setUserRole('adopter');
  const loginAsShelter = () => setUserRole('shelter');
  const logout = () => setUserRole('guest');

  // Extended reviews data
  const reviews = [
    { title: "Amazing Experience!", story: "We found our perfect furry friend through this platform, and the process was seamless.", author: "Jane Doe" },
    { title: "Highly Recommend!", story: "The staff was very helpful, and now we have a new family member who brings us so much joy.", author: "John Smith" },
    { title: "A True Blessing", story: "Adopting our cat changed our lives, and we're so grateful for this service.", author: "Emily Davis" },
    { title: "Fantastic Service", story: "I never thought adopting a pet would be this easy! Great team and very helpful support.", author: "Robert Wilson" },
    { title: "Heartwarming Experience", story: "Our family adopted two kittens, and they’ve brought so much happiness into our home.", author: "Samantha Green" },
    { title: "Smooth and Safe Process", story: "I felt confident in the adoption process. The platform provided excellent guidance from start to finish.", author: "Michael Brown" },
  ];


  return (
    <div id="root">
      {/* Navbar */}
      <NavbarComponent userRole={userRole} logout={logout} />

      {/* Main Content */}
      <div className="flex-grow-1 text-center mt-4">
        {userRole === 'guest' && (
          <>
            <Container className="text-center mt-4">
              <h1>Welcome to Pet Adoption Platform!</h1>
              <p>Please <a href="#register">Register</a> or <Link to="/login">Log in</Link> to explore more features.</p>
              <div className="img-container">
                <img
                  src={petsImage} 
                  alt="Pets"
                  className="img-fluid"
                />
              </div>
            </Container>

            <p style={{ 
               borderTop: '3px solid rgba(45, 118, 127, 0.7)', // Thicker line with 50% opacity
               width: '50%',                    // Centered at 50% width
               margin: '40px auto 0 auto'       // 20px top margin, centered
            }} />
            
            {/* Adoption Success Stories */}
            <Container className="mt-5 mb-5">
              <h2>Adoption Success Stories</h2>
              <Row className="mt-4">
                {reviews.map((review, index) => (
                  <Col md={4} key={index}>
                    <ReviewCard title={review.title} story={review.story} author={review.author} />
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        )}

        {userRole === 'adopter' && <AdopterView />}
        {userRole === 'shelter' && <ShelterView />}
      </div>

       {/* Footer */}
       <FooterComponent />
    </div>
  );
};

export default Home;
