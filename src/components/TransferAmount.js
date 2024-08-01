import React, { useState } from "react";
import style from "./transferAmount.module.css";

const TransferAmount = ({ accounts, setAccounts }) => {
  const [fromAccountId, setFromAccountId] = useState(1);
  const [toAccountId, setToAccountId] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleTransfer = (e) => {
    e.preventDefault();
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
    handleReset();
  };

  const handleReset = () => {
    setFromAccountId(1);
    setToAccountId(1);
    setAmount(0);
  };

  return (
    <>
      <h3 className={style.sideHeading}>Transfer amount</h3>
      <section className={style.transferSection}>
        <form className={style.transferForm} onSubmit={handleTransfer}>
          <div className={style.formGroup}>
            <label htmlFor="fromAccountId">From Account: </label>
            <input
              type="number"
              id="fromAccountId"
              min={1}
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              placeholder="Enter From account Id"
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="toAccountId">To Account: </label>
            <input
              type="number"
              id="toAccountId"
              min={1}
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              placeholder="Enter To account Id"
              className={style.inputField}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="amount">Amount: </label>
            <input
              type="number"
              id="amount"
              min={0}
              max={accounts.balance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to transfer"
              className={style.inputField}
            />
          </div>
          <div className={style.buttonGroup}>
            <button
              type="submit"
              className={`${style.btn} ${style.btnTransfer}`}
            >
              Transfer
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={`${style.btn} ${style.btnCancel}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default TransferAmount;
