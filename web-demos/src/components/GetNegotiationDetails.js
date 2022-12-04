import React, { useState } from "react";

const GetNegotiationDetails = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [registrationDate, setRegistrationDate] = useState(null);

  return (
    <div>
      <h1>hello world</h1>
      <h3>Insert contract hash</h3>
      <input type="text" id="contractHash" />
      <button>Get Details</button>
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
