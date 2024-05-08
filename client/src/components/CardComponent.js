import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
const CardComponent = ({ course }) => {
  return (
    <Card style={{ width: "15rem", marginTop: "20px" }}>
      <Card.Img variant="top" src={course.thumbnail} />
      <Card.Body>
        <Card.Title> {course.name} </Card.Title>
        <Card.Text
          style={{
            fontSize: "15px",
            color: "#242424",
          }}
        >
          {course.instructor}
        </Card.Text>
        <Card.Text> {course.description}</Card.Text>
        <Link to={`course/${course._id}`}>
          <Button variant="primary">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
