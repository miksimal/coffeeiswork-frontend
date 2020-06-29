import { API } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CSVReader from "react-csv-reader";
import { FormGroup, FormControl, FormLabel, Modal, Button, ListGroup } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewUser.css";

export default function NewUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [employeeArray, setEmployeeArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function validateForm() {
    return email.length > 0 && firstName.length > 0;
  }

  const handleClose = () => {
    if(showSuccessModal) {
      history.push("/");
    } else {
      setShowConfirmationModal(false);
      setShowErrorModal(false);
    }
  }
  const handleForce = (data) => {
    // TODO validation
    console.log(data);
    setEmployeeArray(data);
    setShowConfirmationModal(true);
    
  }

  function renderEmployeeImportList() {
    return employeeArray.map(e =>
    <ListGroup.Item>{e.name + " - " + e.email}</ListGroup.Item>
    )
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

const reader = (
  <div className="csv-input-container">
    <CSVReader
      cssClass="react-csv-input"
      label="Upload a CSV file to add multiple employees. The file needs two columns: name, email. &nbsp;"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  </div>
);

  function renderModalContent() {
    if (showConfirmationModal && !showSuccessModal && !showErrorModal) {
      return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Does this look correct?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're about to add the following employees:
        {renderEmployeeImportList()}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <LoaderButton isLoading={isLoading} variant="primary">
              Add employees
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
            <LoaderButton isLoading={isLoading} variant="primary">
              Try again
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
        <Modal.Body>That's all done. Next stop: the water cooler! ☕️ </Modal.Body>
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
      <Modal show={showSuccessModal || showErrorModal || showConfirmationModal} onHide={handleClose}>
        {renderModalContent()}
      </Modal>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    let user = {email: email, firstName: firstName};

    try {
        await addUser(user);
        setShowSuccessModal(true);
        // history.push("/");
    } catch (e) {
        console.log(e);
        setIsLoading(false);
        setShowErrorModal(true);
    }
  }

  function addUser(user) {
      return API.post("watercooler", "/users", {
          body: user
      })
  }

  return (
    <>
    {renderModal()}
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
    {reader}
    </>
  );
}