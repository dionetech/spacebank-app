import { useEffect, useState } from "react";
import { convertDate } from "../../utils/convertDate";
import { bnbToDollar, nairaToDollar } from "../../utils/currenyConverter";
import { transactionIcon } from "../../utils/imageUtility";

const SingleTrList = ({ transaction, trPage, user }) => {
    const [ifImageError, setIfImageError] = useState(false);
    const [trAmount, setTrAmount] = useState("");
    const [isSender, setIsSender] = useState("");

    useEffect(() => {
        if (user.user.wallet.address === transaction.sender) {
            setIsSender(true);
        } else {
            setIsSender(false);
        }
        let amount;
        if (transaction.extraInfo) {
            if (transaction.extraInfo.amountIn === "naira") {
                amount = nairaToDollar(parseInt(transaction.amount));
                setTrAmount(amount);
            }
        } else {
            if (transaction.icon === "usdt") {
                setTrAmount(transaction.amount);
            }
            if (transaction.icon === "bnb") {
                setTrAmount(bnbToDollar(transaction.amount));
            }
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
                                {isSender
                                    ? transaction.description
                                    : transaction.receiverDescription}
                            </span>
                            <span className="subtitleSpan">
                                {convertDate(transaction.createdAt, "fulldate")}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            {isSender ? (
                                <span className="titleSpan text-right amountSpan red">
                                    ${parseFloat(trAmount).toFixed(2)}
                                </span>
                            ) : (
                                <span className="titleSpan text-right amountSpan green">
                                    ${parseFloat(trAmount).toFixed(2)}
                                </span>
                            )}
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
                                {isSender
                                    ? transaction.description
                                    : transaction.receiverDescription}
                            </span>
                            <span className="subtitleSpan">
                                {isSender
                                    ? getTransactionType(transaction.type)
                                    : getTransactionType(
                                          transaction.receiverType
                                      )}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p>
                            {isSender ? (
                                <span className="titleSpan text-right amountSpan red">
                                    ${parseFloat(trAmount).toFixed(2)}
                                </span>
                            ) : (
                                <span className="titleSpan text-right amountSpan green">
                                    ${parseFloat(trAmount).toFixed(2)}
                                </span>
                            )}
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
