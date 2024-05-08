import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import AuthContext from "../components/AuthContext";
import axios from "axios";

axios.defaults.withCredentials = "true";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginApiCall } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = async (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };
    await loginApiCall(payload);
  };

  // useEffect(() => {
  //   const getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(";").shift();
  //   };

  //   const tokenFromCookie = getCookie("token");

  //   setToken(tokenFromCookie);
  // }, []);
  return (
    <div>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <Row className="my-3">
        <Col>
          New Customer ? <Link to={`/signup`}>Register</Link>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
