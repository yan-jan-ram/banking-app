import React, { useState, useEffect } from "react";
import CreateAccount from "./CreateAccount";
import AccountsDetails from "./AccountsDetails";
import TransactionHistory from "./TransactionHistory";
import TransferAmount from "./TransferAmount";
import style from "./display.module.css";

const Display = () => {
  const [page, setPage] = useState("Accounts");
  const [accounts, setAccounts] = useState([]);

  const getAllAccounts = () => {
    fetch("http://localhost:8081/api/accounts/getAll", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => {
        console.error(error);
        window.alert(`Cannot fetch data due to an error: ${error}`);
      });
  };

  useEffect(() => {
    getAllAccounts();
  }, []);

  const renderPage = () => {
    switch (page) {
      case "Create":
        return <CreateAccount accounts={accounts} setAccounts={setAccounts} />;
      case "Accounts":
        return (
          <AccountsDetails
            accounts={accounts}
            setAccounts={setAccounts}
            getAllAccounts={getAllAccounts}
          />
        );
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
