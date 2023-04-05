import { useEffect, useState } from "react";
import TransactionHeader from "../components/section/TransactionHeader";
import TransactionList from "../components/section/TransactionList";
import TransactionNav from "../components/section/TransactionNav";
import NoTransactionTab from "../components/tab/NoTransactionTab";
import ProtectedLayout from "../layout/ProtectedLayout";
import { convertDate } from "../utils/convertDate";
import MobileTransactions from "./mobile/MobileTransactions";

const Transactions = ({ activeUser, token, removeToken, balances }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const setTranFunc = () => {
            console.log("TR: ", activeUser.transactions);
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
                        <TransactionNav />
                        <TransactionList
                            transactions={transactions}
                            convertDate={convertDate}
                        />
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
