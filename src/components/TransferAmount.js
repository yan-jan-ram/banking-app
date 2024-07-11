import React from "react";

const TransferAmount = ({ accounts, setAccounts }) => {
  const fromAccountId = window.prompt("Enter account Id to transfer from: ");
  const toAccountId = window.prompt("Enter account Id to transfer amount to: ");
  const amount = window.prompt("Enter amount to transfer: ");

  if (fromAccountId && toAccountId && amount) {
    fetch(`http://localhost:8081/api/accounts/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAccountId: parseInt(fromAccountId),
        toAccountId: parseInt(toAccountId),
        amount: parseFloat(amount),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          window.alert("Transfer failed!");
        }
      })
      .then((updatedAccounts) => {
        setAccounts(
          accounts.map((account) =>
            account.accountId === updatedAccounts.fromAccount.accountId
              ? updatedAccounts.fromAccount
              : account.accountId === updatedAccounts.toAccount.accountId
              ? updatedAccounts.toAccount
              : account
          )
        );
        window.alert("Transfer successful!");
      })
      .catch((error) => {
        console.error(error);
        window.alert(`Error: ${error}`);
      });
  }

  return <div></div>;
};

export default TransferAmount;
