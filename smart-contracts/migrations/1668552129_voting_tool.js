var votingToolContract = artifacts.require('VotingTool')

module.exports = function (_deployer) {
  _deployer.deploy(votingToolContract)
};
