import React, { useState, useEffect } from "react";
import { ListGroup, Spinner, DropdownButton, Dropdown, Toast } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [frequency, setFrequency] = useState("");
  const {orgName, isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        setShowSpinner(false);
        setIsLoading(false);
        return
      }

      try {
        const data = await loadUsers();
        const index = data.map(e => e.userId).indexOf("RecurrenceRule");
        const frequency = index >= 0 ? data.splice(index, 1)[0].frequency : "Never";
        setFrequency(frequency);
        setUsers(data);
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

  function setFrequencyRequest(frequency) {
    return API.post("watercooler", "/rules", {
      body: frequency
    });
  }

  function renderUserList(users) {
    return users.map(e =>
    <ListGroup.Item>{e.firstName + " - " + e.email + " - " + e.status}</ListGroup.Item>
    )
  }

  function renderLander() {
    return (
      <>
      <div className="lander">
        <h1>Virtual Watercooler</h1>
        <p></p>
        <p>Connect your distributed organisation using our Cloud-enabled™️ watercooler</p>
        <h4>How it works</h4>
        <h5>1. Sign up an organisation 📝</h5>
        <h5>2. Add members individually or by csv upload 👩🏽‍💻</h5>
        <h5>3. Let the Watercooler randomly pair members via email 🥳</h5>
      </div>
      <div className="testimonials">
        <h4>What the People have to say</h4>
        <h5>'Virtual watercooler changed my life'</h5>
        <h5>'Wow, such Cloud-enabled'</h5>
        <h5>'At Yuhuu Corporation, we increased productivity by 137% using virtual watercooler. Incredible!'</h5>
        <h5>'If you like email, you'll LOVE this app!'</h5>
      </div>
      </>
    );
  }

  function renderSpinner() {
    return (
      <div className="spinner">
      <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading</span></Spinner>
      </div>
    )
  }

  function renderToast(success, frequency) {
    setShowToast(true);

    if (success) {
      switch (frequency) {
        case 'Daily':
          frequency = 'Watercooler chats will be arranged once a day';
          break;
        case 'Never':
          frequency = 'No recurring watercooler chats will be arranged';
          break;
        default:
          frequency = 'Watercooler chats will be arranged on ' + frequency;
      }
    }

    let content = success ? 
      {header: 'Success 🎉',
      body: frequency} :
      {header: 'Something went wrong',
      body: 'Please try again or contact mikkel@virtualwatercooler.com'};

    setToastContent(content);
  }

  function renderLoaded() {
    return (
      <>
        <LoaderButton variant="secondary" href="/users/watercooler">Generate watercooler chats</LoaderButton>
        <DropdownButton
          variant="secondary"
          title={frequency}
          onSelect={async (event) => {
            try {
              await setFrequencyRequest(event);
              setFrequency(event);
              renderToast(true, event)
            } catch(err) {
              console.log(err);
              renderToast(false)
            }
          }}
        >
          {['Never', 'Daily'].map(el => {
            if (el == frequency) {
              return <Dropdown.Item eventKey={el} active>{el}</Dropdown.Item>;
            } else {
              return <Dropdown.Item eventKey={el}>{el}</Dropdown.Item>;
            }})}
          <Dropdown.Header>Weekly on:</Dropdown.Header>
          {['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'].map(el => {
            if (el == frequency) {
              return <Dropdown.Item eventKey={el} active>{el}</Dropdown.Item>;
            } else {
              return <Dropdown.Item eventKey={el}>{el}</Dropdown.Item>;
            }})}
        </DropdownButton>
    <div className="users">
      <h3>Users in {orgName}</h3>
        <LoaderButton variant="secondary" href="/users/new">Add new members</LoaderButton>
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
      <Toast show={showToast} onClose={() => setShowToast(!showToast)} 
        delay={3000} autohide
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: '300px'
        }}
        >
        <Toast.Header>
          <strong className="mr-auto">{toastContent.header}</strong>
        </Toast.Header>
        <Toast.Body>{toastContent.body}</Toast.Body>
      </Toast>
    </div>
  );
}