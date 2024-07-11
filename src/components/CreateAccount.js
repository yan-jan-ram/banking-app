import React from 'react';
import style from './createAccount.module.css';

const CreateAccount = ({ setAccounts }) => {
  const holderName = window.prompt("Enter holder name: ");
  const balance = window.prompt("Enter current balance: ");

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
          window.alert("Failed to create the account");
        }
      })
      .then((newAccount) => {
        setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
        window.alert("Account created successfully!");
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Account creation failed due to error: ${error}`);
      });
  }

  return (
    <section className={style.create}>
      <h3>New account</h3>
    </section>
  );
};

export default CreateAccount;
