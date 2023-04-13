import { useEffect, useState } from "react";
import { convertDate } from "../../utils/convertDate";
import { bnbToDollar, nairaToDollar } from "../../utils/currenyConverter";
import { transactionIcon } from "../../utils/imageUtility";

const SingleTrList = ({ transaction, trPage }) => {
    const [ifImageError, setIfImageError] = useState(false);
    const [trAmount, setTrAmount] = useState("");

    useEffect(() => {
        let amount;
        if (transaction.extraInfo) {
            if (transaction.extraInfo.amountIn === "naira") {
                amount = nairaToDollar(parseInt(transaction.amount));
                setTrAmount(amount);
            }
        } else {
            setTrAmount(bnbToDollar(parseFloat(transaction.amount)));
        }
    }, []);

    const getTransactionType = (type) => {
        console.log("TYPE: ", type);
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
        if (type.split("-")[0] === "sent") {
            return `Sent ${String(type.split("-")[1]).toUpperCase()}`;
        }
        if (type.split("-")[0] === "received") {
            return `Received ${String(type.split("-")[1]).toUpperCase()}`;
        }
    };

    const getTransactionColor = (type) => {
        if (type === "buy-airtime") {
            return "red";
        }
        if (type === "buy-data") {
            return "red";
        }
        if (type === "pay-bill") {
            return "red";
        }
        if (type === "purchased-giftcard") {
            return "red";
        }
        if (type.split("-")[0] === "sent") {
            return "red";
        }
        if (type.split("-")[0] === "received") {
            return "green";
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
                            <span
                                className={`titleSpan text-right amountSpan ${getTransactionColor(
                                    transaction.type
                                )}`}
                            >
                                ${parseFloat(trAmount).toFixed(2)}
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
                            <span
                                className={`titleSpan text-right amountSpan ${getTransactionColor(
                                    transaction.type
                                )}`}
                            >
                                ${parseFloat(trAmount).toFixed(2)}
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
