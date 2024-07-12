import React, { useEffect, useState } from "react";
import style from "./transactionHistory.module.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchAccountId, setSearchAccountId] = useState("");

  const fetchAllTransactions = () => {
    fetch("http://localhost:8081/api/accounts/transactions", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.error(error);
        window.alert(
          `Transaction history can't be loaded due to error: ${error}`
        );
      });
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAccountId) {
      fetch(
        `http://localhost:8081/api/accounts/transactions/${searchAccountId}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            window.alert("There is no transaction history on this account Id");
          }
        })
        .then((data) => setTransactions(data))
        .catch((error) => {
          console.error(error);
          window.alert(`Search failed due to an error: ${error}`);
        });
      setSearchAccountId("");
    } else {
      window.alert("Enter account Id to proceed");
    }
  };

  const handleReset = () => {
    setSearchAccountId("");
    fetchAllTransactions();
  };

  return (
    <section className={style.section}>
      <h3 className={style.sideHeading}>Transactions Section</h3>
      <div className={style.search}>
        <form
          method="get"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="number"
            value={searchAccountId}
            placeholder="Enter a value"
            onChange={(e) => setSearchAccountId(e.target.value)}
          />
        </form>
        <button onClick={handleSearch}>Search</button>
        <button type="reset" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
      <table className={style.transactionsTable}>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Account Id</th>
            <th>Amount</th>
            <th>Transaction Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.accountId}</td>
              <td>{transaction.amount}</td>
              <td className={style.transactionType}>
                {transaction.transactionType}
              </td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TransactionHistory;
