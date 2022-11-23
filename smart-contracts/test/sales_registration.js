const SalesRegistration = artifacts.require("SalesRegistration");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SalesRegistration", function (accounts) {
  let contract;
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  beforeEach(async () => {
    contract = await SalesRegistration.deployed();
  });

  describe("when calling 'getContractDetails' with unregistered hash", () => {
    let actual;

    beforeEach(async () => {
      actual = await contract.getContractDetails("somehash");
    });

    it("should return no data in 'From' attribute", async () => {
      assert.equal(zeroAddress, actual.From);
    });

    it("should return no data in 'To' attribute", async () => {
      assert.equal(zeroAddress, actual.To);
    });

    it("should return no data in 'Timestamp' attribute", async () => {
      assert.equal(0, actual.Timestamp);
    });
  });

  describe("when registering a negotiation", () => {
    it("should revert when sender is not owner", async () => {
      try {
        await contract.registerNegotiation(
          accounts[1],
          accounts[2],
          "somehash",
          { from: accounts[3] }
        );
      } catch (error) {
        console.log(error.reason);
        assert.equal("revert", error.data.message);
        assert.equal("only contract owner can reegister negotiations", error.data.reason);
      }
    });
  });
});
