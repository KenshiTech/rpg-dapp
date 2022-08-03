const DiceRoller = artifacts.require("DiceRoller");

module.exports = function (deployer, network, accounts) {
  require("dotenv").config();
  deployer.deploy(DiceRoller, { from: process.env.OWNER || accounts[0] });
};
