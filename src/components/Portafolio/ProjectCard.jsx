import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProjectCard = ({ title, description, techs, demoLink }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Tecnologías: {techs}</Card.Subtitle>
        <Button variant="primary" href={demoLink} target="_blank">
          Ver Proyecto
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;