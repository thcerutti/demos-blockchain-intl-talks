var contract = artifacts.require('SalesRegistration')

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(contract)
};
