import React, { useState, } from "react";
import { useParams } from "react-router-dom";
import "./ConfirmUnsubscribe.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default function ConfirmUnsubscribe() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { userId, orgId } = useParams();

  async function confirmUnsubscribe() {
    setIsLoading(true);
    try {
      await API.post("watercooler", "/unsubscribe/confirm", {
        body: {
          orgId: orgId,
          userId: userId
        }
      });
      setSuccess(true);
      setIsLoading(false);;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  function renderConfirmUnsubscribe() {
    return (
      <>
      <h2>Click the button to confirm that you'd like to unsubscribe.</h2>
      <LoaderButton
        size="lg"
        bsStyle="primary"
        isLoading={isLoading}
        onClick={confirmUnsubscribe}
      >Confirm
      </LoaderButton>
      </>
    )
  }

  function renderSuccess() {
    return (
      <>
        <h2>Successfully unsubscribed.</h2>
        <p>We are sorry to see you go. Contact your organisation admin if you'd like to reactivate your account. You can now close this window.</p>
      </>
    )
  }

  return (
    <>
    {success ? renderSuccess() : renderConfirmUnsubscribe()}
    </>
  );
}