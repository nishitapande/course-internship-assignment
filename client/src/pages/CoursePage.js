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

axios.defaults.withCredentials = "true";

const CoursePage = () => {
  const { user } = useContext(AuthContext);
  //console.log(user);
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseSyllabus, setCourseSyllabus] = useState([]);
  const [courseprerequisities, setCoursePrerequisities] = useState([]);

  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:8080/v1/api/course/${id}`);
      //console.log(res.data.syllabus);
      console.log(res.data);
      setCourseInfo(res.data);
      setCourseSyllabus(res.data.syllabus);
      setCoursePrerequisities(res.data.prerequisities);
    })();
  }, []);
  //console.log(courseSyllabus);

  const addCourseHandler = async () => {
    //alert("Course added");
    const res = await axios.patch(
      `http://localhost:8080/v1/api/user/${user._id}/${id}`
    );
    console.log(res);
  };
  return (
    <Container>
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <Row
          style={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Image
                  src={courseInfo.thumbnail}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </ListGroup.Item>
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
                Enrollment Status: {courseInfo.enrollmentStatus}
              </ListGroup.Item>
              <ListGroup.Item> Duration: {courseInfo.duration}</ListGroup.Item>
              <ListGroup.Item> Schedule: {courseInfo.schedule}</ListGroup.Item>
              <ListGroup.Item> Location: {courseInfo.location}</ListGroup.Item>
              <ListGroup.Item>
                Prerequisities:{" "}
                {courseprerequisities.length === 0 ? (
                  <span>No prerequisities </span>
                ) : (
                  courseprerequisities.map((item) => {
                    return <span>{item.name}</span>;
                  })
                )}
              </ListGroup.Item>
              <ListGroup.Item>Syllabus</ListGroup.Item>
              {courseSyllabus.map((item) => {
                return <ArrayComp item={item} />;
              })}
            </ListGroup>
          </Col>
          <Col
            md={3}
            style={{
              marginTop: "60px",
              marginBottom: "30px",
              marginLeft: "30px",
              marginRight: "30px",
            }}
          >
            <Card
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <ListGroup variant="flush">
                <h2
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#242424",
                    fontFamily: "sans-serif",
                  }}
                >
                  Add Course
                </h2>
                <ListGroup.Item>
                  <Button
                    onClick={addCourseHandler}
                    className="btn-block"
                    type="button"
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      fontFamily: "sans-serif",
                      borderRadius: "10px",
                    }}
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
