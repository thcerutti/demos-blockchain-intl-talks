const Web3 = require("web3");
const configs = require("../configs/blockchain-config.json");
const contractAbi =
  require("../contract-interfaces/SalesRegistration.json").abi;

const getContractDetailsAsync = async () => {
  const web3 = new Web3(configs.rpcUrl);

  const myContract = new web3.eth.Contract(
    contractAbi,
    configs.contractAddress
  );
  return myContract.methods
    .getContractDetails(configs.contractOwner)
    .call((err, res) => {
      if (err) {
        throw err;
      }
      return res;
    });
};

export { getContractDetailsAsync };
