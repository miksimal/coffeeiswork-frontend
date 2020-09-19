import React, { useState, } from "react";
import { useParams } from "react-router-dom";
import "./ConfirmMember.css";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default function ConfirmMember() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { orgId, email, tokenId } = useParams();

  async function confirmMember() {
    setIsLoading(true);
    try {
      await API.post("watercooler", "/confirm", {
        body: {
          tokenId: tokenId,
          orgId: orgId,
          email: email
        }
      });
      setSuccess(true);
      setIsLoading(false);;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  function renderConfirm() {
    return (
      <div className="Confirm">
      <h3>Welcome! Please confirm to start receiving watercooler chat invitations</h3>
      <LoaderButton
        size="lg"
        bsStyle="primary"
        isLoading={isLoading}
        onClick={confirmMember}
      >Confirm ☕️
      </LoaderButton>
      </div>
    )
  }

  function renderSuccess() {
    return (
      <>
        <h2>All set! 🎉</h2>
        <p>You'll start receiving watercooler chat invitations in your inbox. You can now close this window.</p>
      </>
    )
  }

  return (
    <>
    {success ? renderSuccess() : renderConfirm()}
    </>
  );
}