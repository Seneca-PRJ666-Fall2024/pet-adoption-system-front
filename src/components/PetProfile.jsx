import {Card, Col, Image, Row} from "react-bootstrap";
import React from 'react';

const PetProfile = ({ pet, imageSrc, attributeGroups }) => {
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
                        {attributeGroups.map((group, index) => (
                            <div key={group.name}>
                            {pet[group.name] && (
                                    <p><strong>{group.description}: </strong>{pet[group.name]}</p>
                                )
                            }
                            </div>
                        ))}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PetProfile;