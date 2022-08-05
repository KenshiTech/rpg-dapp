import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import abi from "./abi";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();
    let contract;
    try {
      // Not Fuji
      if (networkID !== 43113) {
        throw new Error("Not Avalanche Fuji (C-Chain).");
      }
      contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: actions.init,
      data: { web3, accounts, networkID, contract },
    });
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        init();
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
