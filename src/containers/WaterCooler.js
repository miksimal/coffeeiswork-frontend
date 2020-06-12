import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./WaterCooler.css";
import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";

export default function WaterCooler() {
  const [pairs, setPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return
      }

      try {
        const pairs = await generatePairs();
        setPairs(pairs);
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function generatePairs() {
      return API.get("watercooler", "/pair");
  }

  function renderPairsList(pairs) {
    return pairs.map(e =>
    <ListGroup.Item>{e[0].email + " <☕️> " + e[1].email}</ListGroup.Item>
    )
  }

  function renderPairs() {
    return (
      <div className="pairs">
      <h3>Here are your WaterCooler chat pairings</h3>
        <ListGroup variant="flush">
          {!isLoading && renderPairsList(pairs)}
        </ListGroup>
      </div>
    )
  }

  return (
    <>
    <div className="controls">
      <LoaderButton>Re-shuffle</LoaderButton>
      <LoaderButton>Connect each pair</LoaderButton>
    </div>
    {!isLoading && renderPairs()}
    </>
  )
}