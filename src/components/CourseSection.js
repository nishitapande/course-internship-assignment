import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://courses-api-production.up.railway.app/v1/api/course"
      );
      setCourses(res.data);
    })();
  });

  return (
    <div style={{}}>
      <h1>Courses to offer</h1>
      {courses.length === 0 ? (
        <div>Sorry no courses</div>
      ) : (
        <Row style={{}}>
          {courses.map((course) => {
            return (
              <Col
                key={course._id}
                style={{
                  margin: "5px",
                  padding: "10px",
                  width: "300px",

                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CardComponent course={course} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default CourseSection;
