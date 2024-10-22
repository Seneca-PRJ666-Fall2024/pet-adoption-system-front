import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const PetCard = ({ imageSrc, status }) => {
  return (
    <Col md={4}>
      <Card className="mb-4 shadow-sm">
        <Card.Img variant="top" src={imageSrc} />
        <Card.Body>
          <Button variant="link">View pet’s profile</Button>
          <Row>
            <Col>
              <Button variant="success">{status === 'adopted' ? 'Adopted' : 'Still available'}</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PetCard;
