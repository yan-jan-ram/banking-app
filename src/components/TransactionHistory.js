import React, { useEffect, useState } from "react";
import style from "./transactionHistory.module.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <section className={style.section}>
      <h3 className={style.sideHeading}>Transactions Section</h3>
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
