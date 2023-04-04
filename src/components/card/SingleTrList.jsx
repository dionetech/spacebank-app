import { useState } from "react";
import { convertDate } from "../../utils/convertDate";
import { transactionIcon } from "../../utils/imageUtility";

const SingleTrList = ({ transaction, trPage }) => {
    const [ifImageError, setIfImageError] = useState(false);

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
        <>
            {!trPage ? (
                <li>
                    <div className="initialDiv">
                        {!ifImageError ? (
                            <img
                                src={transactionIcon(transaction)}
                                style={{
                                    width: "26px",
                                    height: "26px",
                                }}
                                onError={() => setIfImageError(true)}
                                alt="Transaction Card Icon"
                            />
                        ) : (
                            <div className="replaceTrImage"></div>
                        )}
                        <p>
                            <span className="titleSpan">
                                {transaction.description}
                            </span>
                            <span className="subtitleSpan">
                                {convertDate(transaction.createdAt, "fulldate")}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="titleSpan text-right">
                                {transaction.amount}
                            </span>
                        </p>
                    </div>
                </li>
            ) : (
                <li className={transaction.class}>
                    <div className="initialDiv">
                        {!ifImageError ? (
                            <img
                                src={transactionIcon(transaction)}
                                style={{
                                    width: "26px",
                                    height: "26px",
                                }}
                                onError={() => setIfImageError(true)}
                                alt="Transaction Card Icon"
                            />
                        ) : (
                            <div className="replaceTrImage"></div>
                        )}
                        <p>
                            <span className="titleSpan">
                                {transaction.description}
                            </span>
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
            )}
        </>
    );
};

export default SingleTrList;
