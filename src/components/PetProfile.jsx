import {Card, Col, Image, Row} from "react-bootstrap";
import React from 'react';

const PetProfile = ({ pet, imageSrc }) => {
    return (
        <Card className="mt-4">
            <Card.Body>
                <Row>
                    <Col xs={12} sm={6}>
                        <Image
                            src={imageSrc}
                            alt="Pet"
                            className="rounded-circle"
                            style={{width: "300px", height: "300px", margin: "0 60px", objectFit: "cover"}}
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <p><strong>Pet Name:</strong> {pet.petName}</p>
                        <p><strong>Pet Type:</strong> {pet.petType}</p>
                        <p><strong>Breed:</strong> {pet.petBreed}</p>
                        <p><strong>Gender:</strong> {pet.petGender}</p>
                        <p><strong>Age:</strong> {pet.petAge} years</p>
                        <p><strong>Color:</strong> {pet.petColour}</p>
                        <p><strong>Size:</strong> {pet.petSize}</p>
                        <p><strong>Active Level:</strong> {pet.petActivityLevel}</p>
                        <p><strong>Living Environment:</strong> {pet.petEnvironment}</p>
                        <p><strong>Social Condition:</strong> {pet.petSocial}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PetProfile;