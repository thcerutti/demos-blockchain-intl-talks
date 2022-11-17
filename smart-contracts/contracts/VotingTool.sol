// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VotingTool {
    mapping(address => bool) hasVoted;
    mapping(address => uint256) votes;
    mapping(address => bool) registeredCandidates;
    address[] candidates;
    address[] voters;
    address _owner;

    constructor() {
        _owner = msg.sender;
    }

    function vote(address candidate) public {
        require(!hasVoted[msg.sender], "account already voted");
        require(registeredCandidates[candidate], "invalid candidate");

        votes[candidate]++;
        hasVoted[msg.sender] = true;
        voters.push(msg.sender);
    }

    function registerCandidate(address candidate) public {
        require(candidate != _owner, "contract owner cannot be candidate");
        require(
            !registeredCandidates[candidate],
            "candidate already registered"
        );

        registeredCandidates[candidate] = true;
        candidates.push(candidate);
    }

    function getVotes(address candidate) public view returns (uint256) {
        require(
            registeredCandidates[candidate],
            "address is not a registered candidate"
        );

        return votes[candidate];
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidates;
    }

    event DataResetByOwner(uint256 timestamp);

    function resetVoting() public {
        resetVotes();
        resetCandidates();
        emit DataResetByOwner(block.timestamp);
    }

    function resetVotes() private {
        for (uint256 i = 0; i < candidates.length; i++) {
            votes[candidates[i]] = 0;
        }
        for (uint256 i = 0; i < voters.length; i++) {
            hasVoted[voters[i]] = false;
        }
    }

    function resetCandidates() private {
        for (uint256 i = 0; i < candidates.length; i++) {
            registeredCandidates[candidates[i]] = false;
        }
        delete candidates;
    }
}
