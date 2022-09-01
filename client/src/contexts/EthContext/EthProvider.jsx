import React, { useReducer, useCallback } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import abi from "./abi";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (wallet) => {
    const web3 = new Web3(wallet.provider);
    let contract;
    try {
      contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: actions.init,
      data: { wallet, contract, initialized: true },
    });
  }, []);

  const updateWallet = (wallet) => {
    dispatch({ type: actions.updateWallet, data: wallet });
  };

  const reset = () => {
    dispatch({ type: actions.reset });
  };

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
        init,
        updateWallet,
        reset,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
