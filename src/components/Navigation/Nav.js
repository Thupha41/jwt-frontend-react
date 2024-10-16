import React, { useContext, useEffect, useState } from "react";
import "./Nav.scss";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userServices";
import { toast } from "react-toastify";

const NavHeader = () => {
  const { user, logoutContext } = useContext(UserContext);
  const history = useHistory();
  const handleLogout = async () => {
    let res = await logoutUser(); //clear cookies
    localStorage.removeItem("jwt"); //clear localStorage
    logoutContext(); //clear user data in context
    if (res && +res.EC === 1) {
      toast.success("Log out successfully");
      history.push("/login");
    } else {
      toast.error(res.EM);
    }
  };

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
                  <NavLink to="/permissions" className="nav-link">
                    Permissions
                  </NavLink>
                  <NavLink to="/role-permission" className="nav-link">
                    Assign Permissions
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
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome, {user.account.username}!
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                          Change Password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          <span onClick={() => handleLogout()}>Log Out</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
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
