import React, { useState, useEffect } from "react";
const sha256 = require("js-sha256");
const contractAbi =
  require("../contract-interfaces/SalesRegistration.json").abi;
const configs = require("../configs/blockchain-config.json");

const RegisterNewContract = () => {
  const sampleContractValue = `Comprador: John Smith (CPF: 000.000.000-00); Vendedor: Lucy Brown (CPF: 111.111.111-11); Imóvel: apartamento na Rua Something, número 42, Bairro Centro, área construída 350m²; Valor de negociação: R$ 750.000,00; Data atual: ${new Date().toISOString()}`;

  const [contractHash, setContractHash] = useState("");
  const [buyerAddress, setBuyerAddress] = useState(configs.defaultAccountTo);
  const [sellerAddress, setSellerAddress] = useState(
    configs.defaultAccountFrom
  );
  const [contractOriginalContent, setContractOriginalContent] =
    useState(sampleContractValue);

  useEffect(() => {
    setContractHash(sha256(contractOriginalContent));
  }, [contractOriginalContent]);

  const onSendTransaction = () => {
    const Web3 = require("web3");
    const web3 = new Web3(configs.rpcUrl);

    const myContract = new web3.eth.Contract(
      contractAbi,
      configs.contractAddress
    );

    myContract.methods
      .registerNegotiation(
        configs.defaultAccountFrom,
        configs.defaultAccountTo,
        contractHash
      )
      .send({ from: configs.contractOwner, gas: 100000 }, (err, tx) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Transaction hash", tx);
      });
  };

  return (
    <div>
      <h1>New Contract Registration</h1>
      <div>
        <h2>Contract original content</h2>
        <textarea
          cols="90"
          rows="10"
          value={contractOriginalContent}
          onChange={(event) => setContractOriginalContent(event.target.value)}
        ></textarea>
      </div>

      <div>
        <h2>Transaction Data</h2>
        <div>
          <label htmlFor="newContractHash">Contract Hash</label>
          <input
            type="text"
            id="newContractHash"
            value={contractHash}
            onChange={(event) => setContractHash(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="buyer">Buyer Address</label>
          <input
            type="text"
            value={buyerAddress}
            onChange={(event) => setBuyerAddress(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="seller">Seller Address</label>
          <input
            type="text"
            id="seller"
            value={sellerAddress}
            onChange={(event) => setSellerAddress(event.target.value)}
          />
        </div>

        <button onClick={onSendTransaction}>Register Contract</button>
      </div>
    </div>
  );
};

export default RegisterNewContract;
