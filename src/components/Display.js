import React, { useState, useEffect } from "react";
import CreateAccount from "./CreateAccount";
import AccountsDetails from "./AccountsDetails";
import TransactionHistory from "./TransactionHistory";
import TransferAmount from "./TransferAmount";
import style from "./display.module.css"; // Add this line to import your CSS module

const Display = () => {
  const [page, setPage] = useState("Accounts");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/accounts/getAll", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error(error));
  }, []);

  const renderPage = () => {
    switch (page) {
      case "Create":
        return <CreateAccount setAccounts={setAccounts} />;
      case "Accounts":
        return <AccountsDetails accounts={accounts} setAccounts={setAccounts} />;
      case "Transactions":
        return <TransactionHistory />;
      case "Transfer":
        return <TransferAmount accounts={accounts} setAccounts={setAccounts} />;
      default:
        return <h1>Loading...</h1>;
    }
  };

  return (
    <>
      <h1 className={style.mainHeading}>Banking</h1>
      <div className={style.buttons}>
      <button onClick={() => setPage("Create")}>Create</button>
      <button onClick={() => setPage("Accounts")}>Accounts</button>
      <button onClick={() => setPage("Transactions")}>Transactions</button>
      <button onClick={() => setPage("Transfer")}>Transfer</button>
      </div>
      <div>{renderPage()}</div>
    </>
  );
};

export default Display;
