import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light" variant="light" expand="md">
        <Navbar.Brand>
            <Link to="/">CoffeeIsWork</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <LinkContainer to="/signup" className="mr-sm-2">
              <Link>Signup</Link>
            </LinkContainer>
            <LinkContainer to="/login" className="mr-sm-2">
              <Link>Login</Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
