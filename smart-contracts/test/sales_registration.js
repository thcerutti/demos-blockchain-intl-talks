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
    describe("on pre-validating input", () => {
      it("should revert when sender is not owner", async () => {
        try {
          await contract.registerNegotiation(
            accounts[1],
            accounts[2],
            "somehash",
            { from: accounts[3] }
          );
        } catch (error) {
          assert.equal("revert", error.data.message);
          assert.equal(
            "only contract owner can reegister negotiations",
            error.data.reason
          );
        }
      });

      it("should revert is hash already registered", async () => {
        let myHash = new Date().toISOString();

        const registerContractTestCase = async (hash) =>
          await contract.registerNegotiation(accounts[1], accounts[2], hash);

        await registerContractTestCase(myHash);
        try {
          await registerContractTestCase(myHash);
        } catch (error) {
          assert.equal("revert", error.data.message);
          assert.equal("negotiation already registered", error.data.reason);
          return;
        }
        assert.fail("registration not reverted as expected");
      });
    });

    describe("on registering a negotiation", () => {
      let negotiationHash;
      beforeEach(() => {
        negotiationHash = new Date().toISOString();
      });

      it('should emit "NegotiationRegistered" event', async () => {
        let receipt = await contract.registerNegotiation(
          accounts[1],
          accounts[2],
          negotiationHash
        );
        let { event, args } = receipt.logs[0];
        assert.equal("NegotiationRegistered", event, "unexpected event name");
        assert.equal(
          accounts[1],
          args.from,
          "unexpected seller (from) account ID"
        );
        assert.equal(accounts[2], args.to, "unexpected buyer (to) account ID");
      });
    });

    describe("after register a negotiation", () => {
      const registerContract = async (from, to, hash) =>
        await contract.registerNegotiation(from, to, hash);

      it("should get the negotiation details from contract method", async () => {
        let fromAddress = accounts[1];
        let toAddress = accounts[2];
        let negotiationHash = new Date().toISOString();

        await registerContract(fromAddress, toAddress, negotiationHash);

        let contractDetails = await contract.getContractDetails(
          negotiationHash
        );
        assert.equal(
          fromAddress,
          contractDetails.From,
          "unexpected origin account"
        );
        assert.equal(
          toAddress,
          contractDetails.To,
          "unexpected destination account"
        );
      });
    });
  });
});
