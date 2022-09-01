import { useState, useEffect } from "react";
import styled from "styled-components";
import useEth from "../../contexts/EthContext/useEth";
import { MdOutlineErrorOutline } from "react-icons/md";
import ContractError from "./ContractError";
import { rollDice, fetchEvent, tryAgain } from "../../lib/dice";
import Marker from "../Marker";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "../Button";
import JSConfetti from "js-confetti";

const LOADER_SIZE = 32;
const LOADER_COLOR = "#fff";

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .header {
    display: flex;
    justify-content: space-between;
  }

  & .button {
    margin: 1em auto;
  }

  & .error {
    color: #ff0000;
  }
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  gap: 1.5em;

  & .marker {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: span 2;
  }

  & h3 {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
  }

  & p {
    grid-column: 2;
    grid-row: 2;
    margin: 0;
    margin-bottom: 3em;
  }
`;

function Demo() {
  const {
    state: { contract, wallet, initialized },
  } = useEth();
  const [value, setValue] = useState("");
  const [lastStep, setLastStep] = useState("");
  const [error, setError] = useState(null);
  const [steps, setSteps] = useState([]);

  const appendStep = (step) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const roll = async () => {
    setSteps([]);
    appendStep("roll");

    const requestId = await rollDice(contract, wallet.accounts[0].address);

    appendStep("event");
    await tryAgain(10, async () => {
      try {
        const result = await fetchEvent(parseInt(requestId, 10));
        if (result) {
          setValue(result);
          appendStep("done");

          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti();

          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        setError(error);
        return true;
      }
    });
  };

  useEffect(() => {
    setLastStep(steps.length ? steps[steps.length - 1] : "");
  }, [steps]);

  const stepsJsx = {
    roll: (
      <Step key="roll">
        <div className="marker">
          <Marker type="start" error={error && lastStep === "roll"} loading={lastStep === "roll"} />
        </div>
        <h3>The VRF call is submitted</h3>
        <p>
          A request has been made to the smart contract to roll the dice. The Kenshi VRF has been called. Now the VRF is
          waiting for the blockchain transation to be submitted.
        </p>
      </Step>
    ),
    event: (
      <Step key="event">
        <div className="marker">
          <Marker type="middle" error={error && lastStep === "event"} loading={lastStep === "event"} />
        </div>
        <h3>Waiting for the blockchain event</h3>
        <p>
          The transaction has been submitted, and now the resulting block has to be mined and appended to the
          blockchain. This might take a while depending on the chain used. The Kenshi Deep Index can only fetch events
          that are on the blockchain.
        </p>
      </Step>
    ),
    done: (
      <Step key="done">
        <div className="marker">
          <Marker type="end" error={error} />
        </div>
        <h3>The VRF gave the number {value}</h3>
        <p>
          The block has been mined and appended to the blockchain. Now the Kenshi Deep Index is able to find it based on
          the parameters the application provides. And here is the result. 🎉
        </p>
      </Step>
    ),
  };

  return (
    <Container>
      <div className="header">
        <h1>Dice roller</h1>
      </div>
      {error && <p className="error">⚠️ {error.message}</p>}
      {!initialized ? (
        <p>You should connect your wallet first.</p>
      ) : !contract ? (
        <ContractError />
      ) : (
        <>
          <p>Make sure your wallet is connected to Avalanche Fuji C-Chain and you have enough AVAX for gas.</p>
          <div className="button">
            <Button onClick={roll} disabled={(steps.length && !steps.includes("done")) || error}>
              {error ? (
                <MdOutlineErrorOutline size={LOADER_SIZE * 1.5} color={LOADER_COLOR} />
              ) : steps.length && !steps.includes("done") ? (
                <ClipLoader color={LOADER_COLOR} size={LOADER_SIZE} />
              ) : steps.includes("done") && value ? (
                value
              ) : (
                "Roll"
              )}
            </Button>
          </div>
          <div className="steps">
            {steps.map((step) => {
              return stepsJsx[step];
            })}
          </div>
        </>
      )}

      <p>
        An example created using <a href="https://docs.kenshi.io/services/vrf/index.html">Kenshi VRF</a> and{" "}
        <a href="https://docs.kenshi.io/services/deep-index/graphql/index.html">Kenshi Deep Index GraphQL API</a>
      </p>
    </Container>
  );
}

export default Demo;
