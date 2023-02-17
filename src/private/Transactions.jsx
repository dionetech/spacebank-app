import { useEffect, useState } from "react";
import TransactionHeader from "../components/section/TransactionHeader";
import TransactionList from "../components/section/TransactionList";
import TransactionNav from "../components/section/TransactionNav";
import NoTransactionTab from "../components/tab/NoTransactionTab";
import ProtectedLayout from "../layout/ProtectedLayout";

const Transactions = ({ activeUser, token, removeToken, convertDate }) => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(activeUser.transactions);     
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
                    <TransactionList
                        transactions={transactions}
                        convertDate={convertDate}
                    />
                </>:
                <NoTransactionTab />
            }
            <br /><br />
            </section>
        </ProtectedLayout>
    )
}

export default Transactions;