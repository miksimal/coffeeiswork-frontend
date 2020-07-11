import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import Routes from './Routes';
import './App.css';

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [orgId, setOrgId] = useState("");
  const [orgName, setOrgName] = useState("");


  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      let session = await Auth.currentSession();
      setOrgId(session.idToken.payload["custom:organisationId"]);
      setOrgName(session.idToken.payload["custom:organisationName"]);
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect bg="light" variant="light" expand="md">
        <Navbar.Brand>
            <Link to="/">Virtual Watercooler</Link>
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
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, orgId, orgName }}>
       <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
