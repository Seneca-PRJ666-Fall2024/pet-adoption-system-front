// src/components/ReviewCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewCard = ({ title, story, author }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{story}</Card.Text>
        <footer className="blockquote-footer"> {author}</footer>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;