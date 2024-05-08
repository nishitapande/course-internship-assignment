import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
axios.defaults.withCredentials = "true";
const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8080/v1/api/course");
      setCourses(res.data);
    })();
  }, [setCourses]);
  console.log(search);
  return (
    <div style={{}}>
      <h1>Courses to offer</h1>
      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button type="submit">Search</button> */}
      </form>
      {courses.length === 0 ? (
        <div>Sorry no courses</div>
      ) : (
        <Row style={{}}>
          {courses
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
              //:item.instructor.toLowerCase().includes(search);
            })
            .map((course) => {
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
