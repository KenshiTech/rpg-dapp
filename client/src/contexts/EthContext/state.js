const actions = {
  init: "INIT",
  updateWallet: "UPDATE_WALLET",
};

const initialState = {
  wallet: null,
  contract: null,
  initialized: false,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.updateWallet:
      return { ...state, wallet: data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
