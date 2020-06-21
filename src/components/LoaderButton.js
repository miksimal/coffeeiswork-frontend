import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      variant='outline-dark'
      {...props}
    >
      {isLoading}
      {props.children}
    </Button>
  );
}

// could add a FA icon in the isloading thing after an && and make it spinning using css