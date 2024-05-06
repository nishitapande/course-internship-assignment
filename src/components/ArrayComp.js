import React from "react";
import { ListGroup } from "react-bootstrap";
const ArrayComp = ({ item }) => {
  return (
    <div>
      <ListGroup variant="flush">
        <ListGroup.Item>Week: {item.week}</ListGroup.Item>

        <ListGroup.Item>{item.topic}</ListGroup.Item>

        <ListGroup.Item>{item.content}</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ArrayComp;
