import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const { isLoggedIn, userId, logout } = useAuth();

  return (
    <header>
      <Navbar bg="dark" variant="dark" className="px-5">
        <Navbar.Brand as={Link} to="/">
          Wishtell
        </Navbar.Brand>
        {/* Removed the Navbar.Toggle */}
        <Nav className="mr-auto">
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to={`/wishlist/${userId}`}>
                Profile
              </Nav.Link>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
