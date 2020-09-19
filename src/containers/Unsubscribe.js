import React, { useState, } from "react";
import "./Unsubscribe.css";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function Unsubscribe() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { orgId } = useParams();

  async function unsubscribe() {
    setIsLoading(true);
    try {
      await API.post("watercooler", "/unsubscribe/request", {
        body: {email: email, organisationId: orgId}
      });
      setSuccess(true);
      setIsLoading(false);;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  function renderUnsubscribe() {
    return (
      <div className="Confirm">
      <h2>Please enter your email below to unsubscribe</h2>
      <form className="UnsubscribeForm">
      <FormGroup controlId="email" bsSize="large">
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
      </form>
      <LoaderButton
        bsStyle="primary"
        isLoading={isLoading}
        onClick={unsubscribe}
      >Unsubscribe
      </LoaderButton>
      </div>
    )
  }

  function renderSuccess() {
    return (
      <>
        <h2>We've sent you an email with a link to confirm.</h2>
        <p>Sorry about the extra step, but we need to check that you're you! You can now close this window.</p>
      </>
    )
  }

  return (
    <>
    {success ? renderSuccess() : renderUnsubscribe()}
    </>
  );
}