import React from "react";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import { Container, Row, Col } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaHome } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <NavbarComponent userRole="guest" />

      <Container className="mt-4">
        <h1 className="text-center">About Us</h1>
        <div className="mt-4">
          <h4>Ontario SPCA and Humane Society</h4>
          <p>
            We are proud to partner with the Ontario SPCA and Humane Society, a
            registered charity that has been dedicated to animal welfare for
            over 150 years. The Ontario SPCA provides care and compassion to
            animals in need across Ontario, promoting respect and kindness for
            all animals.
          </p>
        </div>
        <div className="mt-4">
          <h4>Our Mission</h4>
          <p>
            This platform was created to address the challenges of low adoption
            rates and prolonged shelter stays for animals. By enhancing the
            visibility of shelter animals and streamlining the adoption process,
            our goal is to help more animals find loving homes. Our platform
            offers detailed animal profiles and compatibility matching to
            improve the adoption experience for both pets and adopters.
          </p>
        </div>
        <div className="mt-4">
          <h4>Our Goals</h4>
          <Row>
            <Col md={4} sm={1} className="text-center mt-4">
              <Row>
                <IconContext.Provider value={{ color: "#2d767f", size: 50 }}>
                  <div>
                    <FaHome />
                  </div>
                </IconContext.Provider>
              </Row>
              <Row>
                <p className="mt-2">Increase Adoption Rates</p>
              </Row>
            </Col>
            <Col md={4} sm={1} className="text-center mt-4">
              <Row>
                <IconContext.Provider value={{ color: "#2d767f", size: 50 }}>
                  <div>
                    <MdOutlineAccessTimeFilled />
                  </div>
                </IconContext.Provider>
              </Row>
              <Row>
                <p className="mt-2">Reduce Shelter Stay Duration</p>
              </Row>
            </Col>
            <Col md={4} sm={1} className="text-center mt-4">
              <Row>
                <IconContext.Provider value={{ color: "#2d767f", size: 50 }}>
                  <div>
                    <FaHandsHelping />
                  </div>
                </IconContext.Provider>
              </Row>
              <Row>
                <p className="mt-2">Expand Partnerships</p>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="mt-4">
          <h4>Contact Us</h4>
          <p>
            If you are concerned about an animal's welfare, please contact
            Ontario's Provincial Animal Welfare Services at 1-833-9ANIMAL
            (1-833-926-4625) or your local police. For emergencies, call 911.
          </p>
        </div>
      </Container>
      <FooterComponent />
    </>
  );
};

export default AboutUs;
