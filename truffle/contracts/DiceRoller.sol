//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.15;

import "@kenshi.io/vrf-consumer/contracts/VRFConsumer.sol";

contract DiceRoller is VRFConsumer {
  struct Roll {
    address player;
    uint8 size;
  }
  mapping(uint256 => Roll) requests;
  address _owner;

  constructor() {
    _owner = msg.sender;
  }

  event Request(address player, uint256 requestId);
  event Rolled(address addr, uint8 result, uint256 requestId);

  function setVRFConfig(address coordinator) public {
    require(msg.sender == _owner, "Only owner");
    setupVRF(coordinator);
  }

  function roll(uint8 size) public {
    uint256 requestId = requestRandomness();
    Roll memory future_roll = Roll(msg.sender, size);
    requests[requestId] = future_roll;
    emit Request(msg.sender, requestId);
  }

  function fulfillRandomness(uint256 requestId, uint256 randomness) internal override {
    Roll memory stored_roll = requests[requestId];
    uint8 number = uint8(1 + (randomness % stored_roll.size));
    emit Rolled(stored_roll.player, number, requestId);
  }
}
