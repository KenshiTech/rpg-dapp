import { useState, useEffect } from "react";
import styled from "styled-components";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { maybeConfig, rollDice, fetchEvent, tryAgain } from "../../lib/dice";
import Marker from "../Marker";

const Container = styled.div`
  padding: 1.5rem;
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
    state: { artifact, contract, accounts },
  } = useEth();
  const [value, setValue] = useState("");
  const [steps, setSteps] = useState([]);

  const appendStep = (step) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const roll = async () => {
    setSteps([]);
    await maybeConfig(contract, accounts[0]);
    appendStep("roll");

    const requestId = await rollDice(contract, accounts[0]);

    appendStep("event");
    await tryAgain(10, async () => {
      const result = await fetchEvent(parseInt(requestId, 10));
      if (result) {
        setValue(result);
        appendStep("done");
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  const stepsJsx = {
    roll: (
      <Step>
        <div className="marker">
          <Marker type="start" loading={steps[steps.length - 1] === "roll"} />
        </div>
        <h3>The VRF call is submitted</h3>
        <p>
          The player told the other players the rolled number. The dice roll would be the VRF call. "told the other
          players" would be the submitted blockchain transaction. Now the transaction is being verified by all other
          peers, or in RPG terms, the other players are looking at the dice and verifying if the number is the same as
          the player said.
        </p>
      </Step>
    ),
    event: (
      <Step>
        <div className="marker">
          <Marker type="middle" loading={steps[steps.length - 1] === "event"} />
        </div>
        <h3>Waiting for the blockchain event</h3>
        <p>
          Now the players verified the dice roll and are writing down the rolled number, just to make sure all of them
          agree on the rolled number. "Writing down" would be the appended transaction to the block chain. After this
          step, the rolled number is sure to be true because it was verified by multiple peers/players.
        </p>
      </Step>
    ),
    done: (
      <Step>
        <div className="marker">
          <Marker type="end" />
        </div>
        <h3>The VRF gave the number {value}</h3>
        <p>
          This is the final number returned by the VRF. In RPG terms, this number matches what the player said, the
          number on the dice, and the number all the players wrote down. Fair game for all! 🎉
        </p>
      </Step>
    ),
  };

  return (
    <Container>
      <h1>Blockchain dice roller</h1>

      {!artifact ? (
        <NoticeNoArtifact />
      ) : !contract ? (
        <NoticeWrongNetwork />
      ) : (
        <button onClick={roll} disabled={steps.length && !steps.includes("done")}>
          Roll
        </button>
      )}

      {steps.map((step) => {
        return stepsJsx[step];
      })}

      <p>
        An example created using <a href="https://docs.kenshi.io/services/vrf/index.html">Kenshi VRF</a> and{" "}
        <a href="https://docs.kenshi.io/services/deep-index/graphql/index.html">Kenshi Deep Index GraphQL API</a>
      </p>
    </Container>
  );
}

export default Demo;
