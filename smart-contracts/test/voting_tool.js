const VotingTool = artifacts.require("VotingTool");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("VotingTool", async (accounts) => {
  let candidate1 = accounts[1];
  let candidate2 = accounts[2];
  let candidate3 = accounts[3];
  let contract;

  beforeEach(async () => {
    contract = await VotingTool.deployed();
  })

  describe('on startup', () => {
    it('should have no candidates', async () => {
      let actual = await contract.getAllCandidates()
      assert.equal(0, actual.length)
    })
  })

  describe('before register a candidate', () => {
    it('should not accept contract owner as candidate', async () => {
      let contractOwner = accounts[0];
      try {
        await contract.registerCandidate(contractOwner)
      } catch (error) {
        assert.equal('contract owner cannot be candidate', error.data.reason)
        return;
      }
      assert.fail('Expected throw not received');
    })

    it('should not accept candidate already registered', async () => {
      await contract.registerCandidate(candidate3)
      try {
        await contract.registerCandidate(candidate3)
      } catch (error) {
        assert.equal('candidate already registered', error.data.reason)
        return;
      }
      assert.fail('Expected throw not received');
    })
  })

  describe('after add a candidate', () => {
    it('should be present on the candidate list', async () => {
      await contract.registerCandidate(candidate1)
      let actual = await contract.getAllCandidates()
      assert.equal(candidate1, actual.find(element => element === candidate1))
    })

    describe('and the candidate receives a vote', () => {
      it('should count 1 vote to the candidate', async () => {
        await contract.vote(candidate1)
        let actual = await contract.getVotes(candidate1);
        assert.equal(1, actual)
      })

      it('should revert when double vote on the same candidate', async () => {
        await contract.registerCandidate(candidate2)
        await contract.vote(candidate2, { from: accounts[3] })
        try {
          await contract.vote(candidate2, { from: accounts[3] })
        } catch (error) {
          assert.equal('account already voted', error.data.reason)
          return;
        }
        assert.fail('Expected throw not received');
      })
      
      it('should revert when voting in an inexistent candidate', async () => {
        let invalidCandidate = accounts[4]
        try {

          await contract.vote(invalidCandidate, { from: accounts[4] })
        } catch (error) {
          assert.equal('invalid candidate', error.data.reason)
          return;
        }
        assert.fail('Expected throw not received');
      })
    })
  })
});
