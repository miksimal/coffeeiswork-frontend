import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import { AppContext } from "./libs/contextLib";
import './App.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  function handleLogout() {
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light" variant="light" expand="md">
        <Navbar.Brand>
            <Link to="/">CoffeeIsWork</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            {isAuthenticated
            ? <Link onClick={handleLogout}>Logout</Link>
            : <>
              <LinkContainer to="/signup" className="mr-sm-2">
                <Link>Signup</Link>
              </LinkContainer>
              <LinkContainer to="/login" className="mr-sm-2">
                <Link>Login</Link>
              </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
       <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
