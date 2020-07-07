import React, { useState, useEffect } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [orgName, setOrgName] = useState("");
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        setShowSpinner(false);
        setIsLoading(false);
        return
      }

      try {
        const users = await loadUsers();
        if(users.length>0) setOrgName(users[0].organisationName);
        setUsers(users);
      } catch (e) {
        console.log(e);
      }
      setShowSpinner(false);
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadUsers() {
    return API.get("watercooler", "/users");
  }

  function renderUserList(users) {
    return users.map(e =>
    <ListGroup.Item>{e.firstName + " - " + e.email + " - " + e.status}</ListGroup.Item>
    )
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Virtual Watercooler</h1>
        <p></p>
        <p>Keep your distributed organisation connected through the power of coffee <span role="img" aria-label="emoji coffee">☕️</span></p>
        <h3>How it works</h3>
        <h4>1. Sign up an organisation</h4>
        <h4>2. Add members individually or by csv upload</h4>
        <h4>3. Click the watercooler button to randomly pair members via email</h4>
      </div>
    );
  }

  function renderSpinner() {
    return (
      <div className="spinner">
      <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading</span></Spinner>
      </div>
    )
  }

  function renderLoaded() {
    return (
      <>
    <div className="users">
      <h3>Users in {orgName}</h3>
        <LoaderButton variant="secondary" href="/users/new">Add new members</LoaderButton>
        <LoaderButton variant="secondary" href="/users/watercooler">Generate watercooler chats</LoaderButton>
      <ListGroup variant="flush">
        {!isLoading && renderUserList(users)}
      </ListGroup>
    </div>
    </>
    );
  }

  function renderUsers() {
    return (
      <>
      {showSpinner ? renderSpinner() : renderLoaded()}
      </>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderUsers() : renderLander()}
    </div>
  );
}