// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SalesRegistration {
  mapping(string => NegotiationData) registeredNegotiations;
  address _owner = msg.sender;

  struct NegotiationData {
    address From;
    address To;
    uint Timestamp;
  }

  event ContractRegistered(address from, address to, uint timestamp);

  function registerNegotiation(address from, address to, string memory contractHash) public {
    require(msg.sender == _owner, "only contract owner can reegister negotiations");
    require(registeredNegotiations[contractHash].From != address(0), "negotiation already registered");
    
    registeredNegotiations[contractHash] = NegotiationData(from, to, block.timestamp);
    
    emit ContractRegistered(from, to, block.timestamp);
  }

  function getContractDetails(string memory contractHash) public view returns (NegotiationData memory) {
    return registeredNegotiations[contractHash];
  }
}
