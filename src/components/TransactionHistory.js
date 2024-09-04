import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./transactionHistory.module.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchAccountId, setSearchAccountId] = useState("");
  const navigate = useNavigate();

  const fetchAllTransactions = useCallback(() => {
    fetch("http://localhost:8081/api/accounts/transactions", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => {
        console.error(error);
        navigate(
          `/error?code=500&message=${encodeURIComponent(error.message)}`
        );
      });
  }, [navigate]);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAccountId) {
      fetch(
        `http://localhost:8081/api/accounts/transactions/${searchAccountId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setTransactions(data);
          } else {
            navigate(
              `/error?code=404&message=${encodeURIComponent(
                "No transactions found for this account ID"
              )}`
            );
          }
        })
        .catch((error) => {
          console.error(error);
          navigate(
            `/error?code=500&message=${encodeURIComponent(error.message)}`
          );
        });
      setSearchAccountId("");
    } else {
      navigate(
        `/error?code=400&message=${encodeURIComponent(
          "Enter account ID to proceed"
        )}`
      );
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
        <form method="get" onSubmit={handleSearch}>
          <input
            type="number"
            value={searchAccountId}
            placeholder="Enter account Id"
            onChange={(e) => setSearchAccountId(e.target.value)}
            min={1}
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
