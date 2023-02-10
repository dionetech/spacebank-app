import { useEffect, useState } from "react";
import TransactionHeader from "../components/section/TransactionHeader";
import TransactionList from "../components/section/TransactionList";
import TransactionNav from "../components/section/TransactionNav";
import NoTransactionTab from "../components/tab/NoTransactionTab";
import ProtectedLayout from "../layout/ProtectedLayout";

const Transactions = ({ activeUser, token, removeToken }) => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let tempTransaction = [];
        tempTransaction = activeUser.airtime_purchases.concat(activeUser.bill_purchases);
        tempTransaction = tempTransaction.concat(activeUser.data_purchases);
        tempTransaction = tempTransaction.concat(activeUser.deposits);
        tempTransaction = tempTransaction.concat(activeUser.transfers);
        setTransactions(tempTransaction);        
    }, [])

    return (
        <ProtectedLayout
            navTitle="Transactions"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection">
            {
                transactions.length!==0?
                <>
                    <TransactionHeader />
                    <TransactionNav />
                    <TransactionList />
                </>:
                <NoTransactionTab />
            }
            <br /><br />
            </section>
        </ProtectedLayout>
    )
}

export default Transactions;