import { useEffect, useState } from "react";
import SingleTrList from "../card/SingleTrList";

const WalletTransactions = ({ transactions, activeTab }) => {
    const tab = activeTab.split("-")[1];

    return (
        <div className="transactionList">
            {tab === "bnb" && <BNBTab transactions={transactions} />}
            {tab === "wbnb" && <WBNBTab transactions={transactions} />}
            {tab === "usdt" && <USDTTab transactions={transactions} />}
            {tab === "busd" && <BUSDTab transactions={transactions} />}
        </div>
    );
};

const BNBTab = ({ transactions }) => {
    const [bnbTransactions, setBnbTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "bnb") {
                dummyTr.push(tr);
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

const WBNBTab = ({ transactions }) => {
    const [wbnbTransactions, setWbnbTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "wbnb") {
                dummyTr.push(tr);
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

const USDTTab = ({ transactions }) => {
    const [usdtTransactions, setUsdtTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "usdt") {
                dummyTr.push(tr);
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

const BUSDTab = ({ transactions }) => {
    const [busdTransactions, setBusdTransactions] = useState([]);

    useEffect(() => {
        const dummyTr = [];
        transactions.map((tr, index) => {
            const asset = tr.type.split("-")[1];
            if (!asset) return console.log("Falsy");
            if (asset === "busd") {
                dummyTr.push(tr);
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
