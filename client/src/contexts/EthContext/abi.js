const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomness",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[4]",
        name: "_proof",
        type: "uint256[4]",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "RandomnessFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "Request",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "result",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "Rolled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[4]",
        name: "proof",
        type: "uint256[4]",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        internalType: "uint256[2]",
        name: "uPoint",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[4]",
        name: "vComponents",
        type: "uint256[4]",
      },
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "onRandomnessReady",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "coordinator",
        type: "address",
      },
    ],
    name: "setVRFConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "size",
        type: "uint8",
      },
    ],
    name: "roll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default abi;
