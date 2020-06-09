import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from "../libs/contextLib";
import "./Login.css";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/");
    } catch(error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
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
        <FormGroup controlId="password" bsSize="large">
        <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}