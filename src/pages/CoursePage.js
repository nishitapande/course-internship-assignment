import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ArrayComp from "../components/ArrayComp";
import axios from "axios";
const CoursePage = () => {
  const addCourseHandler = () => {};
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseSyllabus, setCourseSyllabus] = useState([]);
  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://courses-api-production.up.railway.app/v1/api/course/${id}`
      );
      //console.log(res.data.syllabus);
      setCourseInfo(res.data);
      setCourseSyllabus(res.data.syllabus);
    })();
  }, []);
  console.log(courseSyllabus);
  return (
    <Container>
      <div style={{}}>
        <Row
          style={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{courseInfo.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>by {courseInfo.instructor}</ListGroup.Item>
              <ListGroup.Item>{courseInfo.description} </ListGroup.Item>
              <ListGroup.Item>{courseInfo.enrollmentStatus}</ListGroup.Item>
              <ListGroup.Item>{courseInfo.duration}</ListGroup.Item>
              <ListGroup.Item>{courseInfo.schedule}</ListGroup.Item>
              <ListGroup.Item>{courseInfo.location}</ListGroup.Item>
              <ListGroup.Item>{}</ListGroup.Item>

              <ListGroup.Item>Syllabus</ListGroup.Item>
              {courseSyllabus.map((item) => {
                return <ArrayComp item={item} />;
              })}
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>$500</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={addCourseHandler}
                    className="btn-block"
                    type="button"
                    //disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CoursePage;
