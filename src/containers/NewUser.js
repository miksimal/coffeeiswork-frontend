import { API } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewUser.css";

export default function NewUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && firstName.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    let user = {organisationId: "ABC Corp", email: email, firstName: firstName};

    try {
        await addUser(user);
        history.push("/");
    } catch (e) {
        console.log(e);
        setIsLoading(false);
    }
  }

  function addUser(user) {
      return API.post("watercooler", "/users", {
          body: user
      })
  }

  return (
    <div className="NewUser">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="firstName" bsSize="large">
        <FormLabel>First name</FormLabel>
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="text"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Add new user
        </LoaderButton>
      </form>
    </div>
  );
}