import { useEffect, useState } from "react";
import TransactionHeader from "../components/section/TransactionHeader";
import TransactionList from "../components/section/TransactionList";
import TransactionNav from "../components/section/TransactionNav";
import WalletTransactions from "../components/section/WalletTransactions";
import NoTransactionTab from "../components/tab/NoTransactionTab";
import ProtectedLayout from "../layout/ProtectedLayout";
import MobileTransactions from "./mobile/MobileTransactions";

const Transactions = ({ activeUser, token, removeToken, balances }) => {
    const [activeTab, setActiveTab] = useState("all");
    const [transactions, setTransactions] = useState([]);
    const currentRoute =
        window.location.search !== ""
            ? window.location.search.split("=")[1]
            : "";

    useEffect(() => {
        if (currentRoute === "") {
            setActiveTab("all");
        } else {
            setActiveTab(`wallet-${currentRoute}`);
        }
        const setTranFunc = () => {
            setTransactions(activeUser.transactions);
        };
        setTranFunc();
        return;
    }, []);

    return (
        <ProtectedLayout
            navTitle="Transactions"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection main">
                {transactions.length !== 0 ? (
                    <>
                        <TransactionHeader
                            activeUser={activeUser}
                            balances={balances}
                        />
                        <TransactionNav
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {activeTab === "all" && (
                            <TransactionList
                                user={activeUser}
                                transactions={transactions}
                            />
                        )}
                        {activeTab.split("-")[0] === "wallet" && (
                            <WalletTransactions
                                transactions={transactions}
                                activeTab={activeTab}
                            />
                        )}
                    </>
                ) : (
                    <NoTransactionTab />
                )}
                <br />
                <br />
            </section>
            <MobileTransactions
                activeUser={activeUser}
                token={token}
                transactions={transactions}
            />
        </ProtectedLayout>
    );
};

export default Transactions;
