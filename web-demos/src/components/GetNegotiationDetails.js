import React, { useState } from "react";
import { getContractDetailsAsync } from "../services/smartContractService";

const GetNegotiationDetails = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);
  const [contractHash, setContractHash] = useState("");

  const getSmartContractDetails = async (contractHash) => {
    let result = await getContractDetailsAsync(contractHash);
    setFrom(result.From)
    setTo(result.To)
    setRegistrationDate(new Date(result.Timestamp*1000).toISOString())
  };

  return (
    <div>
      <h1>Get contract details</h1>
      <input
        type="text"
        onChange={(event) => setContractHash(event.target.value)}
        placeholder="contract hash"
      />
      <button onClick={() => getSmartContractDetails(contractHash)}>Get Details</button>
      <div>
        <ul>
          <li>
            <span>
              <strong>From:</strong>
              {from}
            </span>
          </li>
          <li>
            <span>
              <strong>To:</strong>
              {to}
            </span>
          </li>
          <li>
            <span>
              <strong>Registration Date:</strong>
              {registrationDate}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GetNegotiationDetails;
