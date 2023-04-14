import { useEffect, useState } from "react";
import SingleTrList from "../card/SingleTrList";

const WalletTransactions = ({ transactions, activeTab, user }) => {
    const tab = activeTab.split("-")[1];

    return (
        <div className="transactionList">
            {tab === "bnb" && (
                <BNBTab user={user} transactions={transactions} />
            )}
            {tab === "wbnb" && (
                <WBNBTab user={user} transactions={transactions} />
            )}
            {tab === "usdt" && (
                <USDTTab user={user} transactions={transactions} />
            )}
            {tab === "busd" && (
                <BUSDTab user={user} transactions={transactions} />
            )}
        </div>
    );
};

const BNBTab = ({ transactions, user }) => {
    const [bnbTransactions, setBnbTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "bnb") {
                dummyTr.push(tr);
            } else {
                if (tr.extraInfo) {
                    if (tr.extraInfo.currency === "bnb") {
                        dummyTr.push(tr);
                    }
                }
            }
        });
        setBnbTransactions(dummyTr);
    }, []);

    return (
        <>
            {bnbTransactions.length !== 0 ? (
                <ul>
                    {bnbTransactions.map((transaction, index) => {
                        return (
                            <SingleTrList
                                key={index}
                                transaction={transaction}
                                trPage={true}
                                user={user}
                            />
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
        </>
    );
};

const WBNBTab = ({ transactions, user }) => {
    const [wbnbTransactions, setWbnbTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "wbnb") {
                dummyTr.push(tr);
            } else {
                if (tr.extraInfo) {
                    if (tr.extraInfo.currency === "wbnb") {
                        dummyTr.push(tr);
                    }
                }
            }
        });
        setWbnbTransactions(dummyTr);
    }, []);

    return (
        <>
            {wbnbTransactions.length !== 0 ? (
                <ul>
                    {wbnbTransactions.map((transaction, index) => {
                        return (
                            <SingleTrList
                                key={index}
                                transaction={transaction}
                                trPage={true}
                                user={user}
                            />
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
        </>
    );
};

const USDTTab = ({ transactions, user }) => {
    const [usdtTransactions, setUsdtTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "usdt") {
                dummyTr.push(tr);
            } else {
                if (tr.extraInfo) {
                    if (tr.extraInfo.currency === "usdt") {
                        dummyTr.push(tr);
                    }
                }
            }
        });
        setUsdtTransactions(dummyTr);
    }, []);

    return (
        <>
            {usdtTransactions.length !== 0 ? (
                <ul>
                    {usdtTransactions.map((transaction, index) => {
                        return (
                            <SingleTrList
                                key={index}
                                transaction={transaction}
                                trPage={true}
                                user={user}
                            />
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
        </>
    );
};

const BUSDTab = ({ transactions, user }) => {
    const [busdTransactions, setBusdTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "busd") {
                dummyTr.push(tr);
            } else {
                if (tr.extraInfo) {
                    if (tr.extraInfo.currency === "busd") {
                        dummyTr.push(tr);
                    }
                }
            }
        });
        setBusdTransactions(dummyTr);
    }, []);

    return (
        <>
            {busdTransactions.length !== 0 ? (
                <ul>
                    {busdTransactions.map((transaction, index) => {
                        return (
                            <SingleTrList
                                key={index}
                                transaction={transaction}
                                trPage={true}
                                user={user}
                            />
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
        </>
    );
};

export default WalletTransactions;
