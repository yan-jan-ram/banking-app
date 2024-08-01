import React, { useState } from "react";
import style from "./createAccount.module.css";

const CreateAccount = ({ accounts, setAccounts }) => {
  const [holderName, setHolderName] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (holderName && balance) {
      fetch("http://localhost:8081/api/accounts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          holderName: holderName,
          balance: parseFloat(balance),
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create the account");
          }
        })
        .then((newAccount) => {
          setAccounts([...accounts, newAccount]);
          window.alert("Account created successfully!");
          setHolderName("");
          setBalance(0);
        })
        .catch((error) => {
          console.error(error);
          window.alert(`Account creation failed due to error: ${error}`);
        });
    } else {
      window.alert("Please provide both holder name and balance");
    }
  };

  return (
    <section className={style.create}>
      <h3 className={style.sideHeading}>New Account</h3>
      <div className={style.card}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Holder Name: </label>
            <input
              type="text"
              placeholder="Enter name"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
          </div>
          <div>
            <label>Balance: </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={balance}
              min={0}
              max={1000000}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className={style.buttonGroup}>
            <button onClick={handleSubmit}>Create</button>
            <button
              type="button"
              onClick={() => {
                setHolderName("");
                setBalance(0);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateAccount;
