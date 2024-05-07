import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AuthContext from "./AuthContext";
const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        style={{
          padding: "20px",
        }}
      >
        <Container>
          <Navbar.Brand href="/">Icon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {user ? (
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dashboard">
                    My Courses
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">LogOut</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
