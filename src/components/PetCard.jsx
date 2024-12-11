import React, { useState } from "react";
import { Card, Button, Row, Col, Image, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PetProfile from "./PetProfile";

const PetCard = ({ pet, imageSrc, attributeGroups }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);

  const handleAdoptionClick = () => {
    navigate("/adoption");
  };

  return (
    <Col md={4}>
      <Card className="mb-4 shadow-sm">
        <Card.Title className="mt-3 mb-3">{pet.petName}</Card.Title>
        <Card.Img
          src={imageSrc}
          alt="Pet's Photo"
          className="rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            margin: "0 auto",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <Card.Body>
          <Row>
            <Col>
              <Button onClick={handleOpenModal} variant="success">
                View pet’s profile
              </Button>
              <br />
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="success" onClick={handleAdoptionClick}>
                {pet.status === "adopted" ? "Adopted" : "Still available"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal for Adding New Pet Profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Pet Profile View: {pet.petName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PetProfile
            attributeGroups={attributeGroups}
            pet={pet}
            imageSrc={imageSrc}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default PetCard;
