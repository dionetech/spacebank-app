
const TransactionList = ({ transactions, convertDate }) => {

    const getTransactionType = (type) => {
        if (type==="buy-airtime"){
            return "Airtime Recharge"
        }
    }

    return (
        <div className="transactionList">
            <ul>
            {
                transactions.map((transaction, index) => {
                    return (
                        <li key={index} className={transaction.class}>
                            <div className="initialDiv">
                                <img
                                    src={transaction.icon}
                                    style={{ width: "30px", height: "30px" }}
                                    alt="Transaction Card Icon"
                                />
                                <p>
                                    <span className="titleSpan">{transaction.description}</span>
                                    <span className="subtitleSpan">{getTransactionType(transaction.type)}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="titleSpan text-right">{transaction.amount}</span>
                                    <span className="subtitleSpan text-right">{convertDate(transaction.createdAt, "fulldate")}</span>
                                </p>
                            </div>
                        </li>
                    )
                })
            }
            </ul>
            <br /><br />
        </div>
    )
}

export default TransactionList;