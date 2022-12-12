# Smart Contract Sample: Voting tool

The goal is to show a simple yet powerful smart contract sample for voting purposes.

## Requirements

- [Truffle suite](https://trufflesuite.com/docs/truffle/how-to/install/#install-truffle): `npm install -g truffle`
- [Download Ganashe](https://trufflesuite.com/ganache/), a visual development blockchain environment (optional)

## Compile contract

To compile the contracts, you SHOULD have at least the Truffle Suite installed on your sandbox. After that, on the `./smart-contracts` folder you can run on the teminal:

`truffle compile`

On your `./smart-contract/build/contracts` you should see the JSON representation of your compiled contracts.

## Deploy the contracts

To deploy your contracts, you should first review the `./smart-contracts/truffle-config.js` file. There you can find the development environment where your contracts should be deployed. If everything is fine, you can run on your terminal, on the contract's project root:

`truffle deploy`

If you have Ganache installed and configured, the contracts should be available on the `CONTRACTS` page.

## Running the tests

You can run all the contract tests from your `./smart-contracts` folder by running on your terminal:

`truffle test`
