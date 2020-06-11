import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return
      }

      try {
        const users = await loadUsers();
        setUsers(users);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadUsers() {
    return API.get("watercooler", "/users");
  }

  function renderUserList(users) {
    return users.map(e =>
    <ListGroup.Item>{e.firstName + " - " + e.email}</ListGroup.Item>
    )
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>CoffeeIsWork</h1>
        <p></p>
        <p>Help remote new-joiners feel welcome through coffee ☕️</p>
        <h3>It's difficult to make remote new-joiners feel warmly welcomed and prevent silos</h3>
        <p>Onboarding new-joiners remotely (whether by choice or by necessity) requires you to think carefully
          about creating a warm and welcoming experience and ensuring the new-joiner meets colleagues from across the company.
        </p>
        <p>It can be daunting for a new-joiner to reach out to busy, anonymous colleagues from other teams. And those colleagues from other teams are busy and may not think to reach out to the new-joiner unless prompted.
        </p>
        <h3>Every new-joiner should drink virtual coffee with colleagues from across the company</h3>
        <p>CoffeeIsWork makes it easy to ensure that every single new-joiner has a warm and welcoming experience. They'll receive friendly emails from colleagues across the company and enjoy lots of virtual coffee for their first weeks.
        </p>
        <h3>How it works: add the new-joiner's email and relax 🎉</h3>
        <p>Add the new-joiner and their email and CoffeeIsWork will suggest a colleague
          from each team that should reach out to the new-joiner for a virtual coffee.
          Edit or accept the <i>chosen ones</i> and CoffeeIsWork will email them and prompt them to reach out.
        </p>
      </div>
    );
  }

  function renderUsers() {
    return (
      <>
      <div className="pair"><LoaderButton>Generate watercooler chats</LoaderButton></div>
      <div className="users">
        <h3>Users in your organisation</h3>
        <ListGroup variant="flush">
          <ListGroup.Item href="/users/new" action variant="warning">+ Add New User</ListGroup.Item>
          {!isLoading && renderUserList(users)}
        </ListGroup>
      </div>
      </>
    )
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderUsers() : renderLander()}
    </div>
  );
}