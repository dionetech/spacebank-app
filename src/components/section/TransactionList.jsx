import { transactionData } from "../../data/transactionData";

const TransactionList = () => {
    return (
        <div className="transactionList">
            <ul>
            {
                transactionData.map((transaction, index) => {
                    return (
                        <li key={index} className={transaction.class}>
                            <div className="initialDiv">
                                <img
                                    src={transaction.cardIcon}
                                    style={{ width: "30px", height: "30px" }}
                                    alt="Transaction Card Icon"
                                />
                                <p>
                                    <span className="titleSpan">{transaction.purchase}</span>
                                    <span className="subtitleSpan">{transaction.transaction}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className="titleSpan text-right">{transaction.amount}</span>
                                    <span className="subtitleSpan text-right">{transaction.date}</span>
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