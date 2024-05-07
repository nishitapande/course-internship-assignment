import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ArrayComp from "../components/ArrayComp";
import axios from "axios";
import AuthContext from "../components/AuthContext";

const CoursePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
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
  //console.log(courseSyllabus);

  const addCourseHandler = async () => {
    //alert("Course added");
    const res = axios.patch(
      `http://localhost:8080/v1/api/user/${user._id}/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res);
  };
  return (
    <Container>
      <div style={{}}>
        <Row
          style={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Col md={2}>
            <Image
              src={courseInfo.thumbnail}
              style={{
                width: "12rem",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{courseInfo.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Instructor: {courseInfo.instructor}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {courseInfo.description}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                EnrollmentStatus: {courseInfo.enrollmentStatus}
              </ListGroup.Item>
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
                <h2>Add Course</h2>
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
