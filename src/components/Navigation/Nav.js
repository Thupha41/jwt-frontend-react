import React, { useContext, useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavHeader = () => {
  const { user } = useContext(UserContext);
  let location = useLocation();

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="/">React</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/project" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Item className="nav-link">Welcome</Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default NavHeader;
