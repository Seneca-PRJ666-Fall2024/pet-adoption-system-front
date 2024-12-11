import { Card, Col, Image, Row } from "react-bootstrap";
import React from "react";

// PetProfile component renders a card displaying a pet's profile information
const PetProfile = ({ pet, imageSrc, attributeGroups }) => {
  return (
    // Card component to wrap the pet profile content
    <Card className="mt-4">
      <Card.Body>
        <Row>
          {/* First column for the pet image */}
          <Col xs={12} sm={6}>
            <Image
              src={imageSrc}
              alt="Pet"
              className="rounded-circle"
              style={{
                width: "300px",
                height: "300px",
                margin: "0 60px",
                objectFit: "cover",
              }}
            />
          </Col>
          {/* Second column for pet attributes */}
          <Col xs={12} sm={6}>
            {attributeGroups.map((group, index) => (
              <div key={group.name}>
                {pet[group.name] && (
                  <p>
                    <strong>{group.description}: </strong>
                    {pet[group.name]}
                  </p>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PetProfile;
