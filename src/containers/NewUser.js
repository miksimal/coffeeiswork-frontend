import { API } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CSVReader from "react-csv-reader";
import { FormGroup, FormControl, FormLabel, Modal, Button, ListGroup, Toast } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewUser.css";

export default function NewUser() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [employeeArray, setEmployeeArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState({});

  function validateForm() {
    return email.length > 0 && name.length > 0;
  }

  const handleClose = () => {
    if(showSuccessModal) {
      history.push("/");
    } else {
      document.getElementById('CSVReaderInput').value = '';
      setShowConfirmationModal(false);
      setShowErrorModal(false);
      setEmployeeArray([]);
    }
  }
  const handleForce = (data) => {
    // TODO add validation of the csv
    let validated = true;
    if (!data.length > 0) {
      validated = false;
      setToastContent({header: 'Validation failed',
      body: 'No data was found. Please check your csv and try again.'});
    }
    else {
      data.forEach(member => {
        if (!member.name?.length > 0
          || !member.email?.length > 0) {
          validated = false;
        }}
      );
      if (!validated) {
        setToastContent({header: 'Validation failed',
        body: 'One or more names or emails were invalid. Please check your csv and try again.'});
      }
    }
    if (validated) {
      setEmployeeArray(data);
      setShowConfirmationModal(true);
    } else {
      setShowToast(true);
      setTimeout(() => document.getElementById('CSVReaderInput').value = '', 500);
    }
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
      inputId='CSVReaderInput'
      cssClass="react-csv-input"
      label="Upload a CSV file to add multiple employees. The file needs two columns: name,email. &nbsp;"
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
          <ListGroup className="employeeImportList">{renderEmployeeImportList()}</ListGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <LoaderButton isLoading={isLoading} onClick={tryToAddEmployees} variant="primary">
              Add employees
            </LoaderButton>
        </Modal.Footer>
        </>
      );
    } else if (showErrorModal && !showSuccessModal) {
      return (
        <>
        <Modal.Header closeButton>
        <Modal.Title>Something went wrong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sorry about that. Would you mind trying again?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <LoaderButton isLoading={isLoading} onClick={tryToAddEmployees} variant="primary">
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
    tryToAddEmployee();
  }

  async function tryToAddEmployee() {
    setIsLoading(true);
    let employeeArray = [{email: email, name: name}]
    setEmployeeArray(employeeArray);
    try {
      await addEmployees(employeeArray);
      setShowSuccessModal(true);
      setIsLoading(false);
      // history.push("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setShowErrorModal(true);
    }
  }

  async function tryToAddEmployees() {
    setIsLoading(true);
    try {
      await addEmployees(employeeArray);
      setShowSuccessModal(true);
      setIsLoading(false);
      // history.push("/");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setShowErrorModal(true);
    }
  }

  function addEmployees(employees) {
      return API.post("watercooler", "/users", {
          body: employees
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
        <FormGroup controlId="name" bsSize="large">
        <FormLabel>First name</FormLabel>
          <FormControl
            value={name}
            onChange={e => setName(e.target.value)}
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
    <Toast show={showToast} onClose={() => setShowToast(!showToast)} 
        delay={4000} autohide
        style={{
          position: 'absolute',
          width: '300px'
        }}
        >
        <Toast.Header>
          <strong className="mr-auto">{toastContent.header}</strong>
        </Toast.Header>
        <Toast.Body>{toastContent.body}</Toast.Body>
      </Toast>
    </>
  );
}