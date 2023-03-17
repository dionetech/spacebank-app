const TransactionList = ({ transactions, convertDate }) => {
  const getTransactionType = (type) => {
    if (type === "buy-airtime") {
      return "Airtime Recharge";
    }
    if (type === "buy-data") {
      return "Data Subscription";
    }
    if (type === "pay-bill") {
      return "Bill Payment";
    }
    if (type === "purchased-giftcard") {
      return "Purchased Giftcard";
    }
  };

  return (
    <div className="transactionList">
      {transactions.length === 0 ? (
        <ul>
          {transactions.map((transaction, index) => {
            return (
              <li key={index} className={transaction.class}>
                <div className="initialDiv">
                  <img
                    src={transaction.icon}
                    style={{ width: "32px", height: "32px" }}
                    alt="Transaction Card Icon"
                  />
                  <p>
                    <span className="titleSpan">{transaction.description}</span>
                    <span className="subtitleSpan">
                      {getTransactionType(transaction.type)}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="titleSpan text-right">
                      ₦{transaction.amount}
                    </span>
                    <span className="subtitleSpan text-right">
                      {convertDate(transaction.createdAt, "fulldate")}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="transactionStatsContent">
          <div className="emptyContent">
            <img
              src="https://res.cloudinary.com/ruthless-labs/image/upload/v1672159101/spacebank/kyoagcmvrxjxwztyfdw0.png"
              style={{ width: "430px", height: "200px" }}
            />
            <h5>No Transaction</h5>
          </div>
        </div>
      )}
      <br />
      <br />
    </div>
  );
};

export default TransactionList;
