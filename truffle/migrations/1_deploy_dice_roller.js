const DiceRoller = artifacts.require("DiceRoller");

module.exports = function (deployer) {
  deployer.deploy(DiceRoller);
};
