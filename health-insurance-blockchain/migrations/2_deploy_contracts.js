//health-insurance-blockchain\migrations\2_deploy_contracts.js

const HealthInsurance = artifacts.require("HealthInsurance");

module.exports = function(deployer) {
  deployer.deploy(HealthInsurance);
};