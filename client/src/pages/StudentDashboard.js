import React, { useState, useEffect, useContext } from "react";
import { Col, Container, ListGroup, Row, Image } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../components/AuthContext";

axios.defaults.withCredentials = "true";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:8080/v1/api/user/${user._id}/courses`
      );
      //console.log(res.data);
      setUserInfo(res.data);
    })();
  }, []);
  console.log("userInfo:", userInfo);
  return (
    <div>
      <Container>
        <h1>Student Dashboard</h1>
        <Row>
          <Col md={2}>
            <ListGroup>
              <ListGroup.Item
                style={{
                  border: "none",
                }}
              ></ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={2}>
            <ListGroup>
              <ListGroup.Item
                style={{
                  border: "none",
                }}
              >
                Name
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={2}>
            <ListGroup>
              <ListGroup.Item
                style={{
                  border: "none",
                }}
              >
                Instructor
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item
                style={{
                  border: "none",
                }}
              >
                Due Date
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item
                style={{
                  border: "none",
                }}
              >
                Status
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {userInfo.map((info) => {
          return (
            <Row
              key={info.key}
              style={{
                marginTop: "20px ",
              }}
            >
              <Col md={2}>
                <ListGroup>
                  <ListGroup.Item
                    style={{
                      border: "none",
                    }}
                  >
                    <Image
                      src={info.thumbnail}
                      style={{
                        width: "9rem",
                        alignSelf: "center",
                      }}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col Col md={2}>
                <ListGroup>
                  <ListGroup.Item
                    style={{
                      border: "none",
                    }}
                  >
                    {" "}
                    {info.name}{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item
                    style={{
                      border: "none",
                    }}
                  >
                    {" "}
                    {info.instructor}{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              {/* 
              <Col>
                <ListGroup>
                  <ListGroup.Item> Image </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroup.Item> Image </ListGroup.Item>
                </ListGroup>
              </Col> */}
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default StudentDashboard;
