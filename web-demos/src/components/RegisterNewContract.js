import React, { useState, useEffect } from "react";
const sha256 = require("js-sha256");
const contractAbi =
  require("../contract-interfaces/SalesRegistration.json").abi;

const RegisterNewContract = () => {
  const sampleContractValue = `Comprador: John Smith (CPF: 000.000.000-00); Vendedor: Lucy Brown (CPF: 111.111.111-11); Imóvel: apartamento na Rua Something, número 42, Bairro Centro, área construída 350m²; Valor de negociação: R$ 750.000,00; Data atual: ${new Date().toISOString()}`;

  const [contractHash, setContractHash] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [contractOriginalContent, setContractOriginalContent] =
    useState(sampleContractValue);
  const [generatedSha256Hash, setGeneratedSha256Hash] = useState("");

  useEffect(() => {
    setGeneratedSha256Hash(sha256(contractOriginalContent));
  }, [contractOriginalContent]);

  const onClickTest = () => {
    const Web3 = require("web3");
    const web3 = new Web3("http://localhost:7545");

    const contractOwner = "0xD98D99D5372431cBa43E6aA27925861B2131C5BB";
    const contractAddress = "0xF2641343E730085f778D070F555b85289f7389ce";
    const myContract = new web3.eth.Contract(contractAbi, contractAddress);
    myContract.methods.getContractDetails(contractOwner).call((err, res) => {
      if (err) {
        console.log("error", err);
      }
      console.log("success", res);
    });
  };

  const onClickRegisterContract = async () => {
    let account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account);

    const transactionData = {
      buyer: buyerAddress,
      seller: sellerAddress,
      contractHash: generatedSha256Hash,
    };
    console.log(transactionData);
  };

  return (
    <div>
      <h1>New Contract Registration</h1>
      <button onClick={onClickTest}>test me!</button>
      <div>
        <h2>Contract original content</h2>
        <textarea
          cols="90"
          rows="10"
          value={contractOriginalContent}
          onChange={(event) => setContractOriginalContent(event.target.value)}
        ></textarea>
        <div>
          <h3>Contract SHA256 Hash</h3>
          <pre>{generatedSha256Hash}</pre>
        </div>
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
            id="buyer"
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

        <button onClick={onClickRegisterContract}>Register Contract</button>
      </div>
    </div>
  );
};

export default RegisterNewContract;
