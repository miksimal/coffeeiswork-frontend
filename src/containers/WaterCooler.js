import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./WaterCooler.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ListGroup, Modal, Button, Spinner } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";

export default function WaterCooler() {
  const history = useHistory();
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const { isAuthenticated, orgId } = useAppContext();
  const [show, setShow] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const handleClose = () => {
    if(showSuccessModal) {
      history.push("/");
    } else {
      setShow(false);
      setShowErrorModal(false);
    }
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        setShowSpinner(false);
        setIsLoading(false);
        return
      }

      try {
        const pairs = await generatePairs();
        setPairs(pairs);
      } catch (e) {
        console.log(e);
      }

      setShowSpinner(false);
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  async function reShuffle() {
    setIsLoading(true);
    try {
      const pairs = await generatePairs();
      setPairs(pairs);
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  }

  function generatePairs() {
      return API.post("watercooler", "/pair", {
        body: {
          orgId: orgId,
        }
      });
  }

  async function emailPairs() {
    setIsSending(true);
    try {
      await API.post("watercooler", "/emailPairs", {
        body: pairs
      });
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
      setShowErrorModal(true);
      setIsSending(false);
    }
}

  function renderPairsList(pairs) {
    return pairs.map(e =>
      <ListGroup.Item>{e[0].email + " ☕️ " + e[1].email}</ListGroup.Item>
    );
  }

  function renderPairs() {
    if (pairs.length > 0 && pairs[0][1]) {
      return (
        <>
        {!isLoading && renderControls()}
        {!isLoading &&
        <div className="pairs">
          <h3>Here are your watercooler chat pairs</h3>
          <ListGroup variant="flush">
            {renderPairsList(pairs)}
          </ListGroup>
        </div>}
        </>
      )
    } else {
      return (
        <>
        {!isLoading && 
        <div className="pairs">
          <h3>Sorry, you need to have 2 or more confirmed members to generate watercooler chats</h3>
          <LoaderButton onClick={() => history.push("/members/new")}>Add new members</LoaderButton>
          <LoaderButton onClick={() => history.push("/")}>See current members</LoaderButton>
        </div>}
        </>
      )
    }
  }

  function renderModalContent() {
    if (!showErrorModal && !showSuccessModal) {
      return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Ready to get the conversations going?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will connect each pair via email. Is that all good?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <LoaderButton isLoading={isSending} variant="primary" onClick={emailPairs}>
              Connect pairs
            </LoaderButton>
        </Modal.Footer>
        </>
      );
    } else if (showErrorModal && !showSuccessModal) {
      return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Please try again</Modal.Title>
        </Modal.Header>
        <Modal.Body>Something went wrong. Sorry about that. Would you mind trying again?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <LoaderButton isLoading={isSending} variant="primary" onClick={emailPairs}>
              Connect pairs
            </LoaderButton>
        </Modal.Footer>
        </>
      )
    } else {
      return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Success! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>All your water cooler pairs have been connected. Let the ☕️ flow!</Modal.Body>
        <Modal.Footer>
            <LoaderButton variant="primary" onClick={handleClose}>
              Done
            </LoaderButton>
        </Modal.Footer>
        </>
      )
  }
  }

  function renderModal() {
    return (
      <Modal show={show} onHide={handleClose}>
        {renderModalContent()}
      </Modal>
    )
  }

  function renderControls() {
    return (
      <>
        <div className="controls">
        <LoaderButton onClick={() => reShuffle()}>Re-shuffle <span role="img" aria-label="reshuffle emoji">🔀</span></LoaderButton>
        <LoaderButton onClick={() => handleShow()}>Connect each pair <span role="img" aria-label="handshake emoji">🤝</span></LoaderButton>
        </div>
      </>
    )
  }

  function renderSpinner() {
    return (
      <div className="spinner">
      <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading</span></Spinner>
      </div>
    )
  }

  return (
    <>
    {renderModal()}
    {showSpinner ? renderSpinner() : renderPairs()}
    </>
  )
}