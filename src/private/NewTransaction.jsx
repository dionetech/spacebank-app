import { Link } from "react-router-dom";
import { transactionsLists } from "../data/newTransactions";
import ProtectedLayout from "../layout/ProtectedLayout";

const NewTransaction = ({ activeUser, token, removeToken }) => {
    return (
        <ProtectedLayout
            navTitle="Transactions"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection">
                <div className="newTransactionDiv">
                    <div className="row">
                    {
                        transactionsLists.map((tr, index) => {
                            return (
                            <div className="col-md-4 col-6" key={index}>
                                <Link to={tr.link} className="miniNewTrCardLink">
                                    <div className="miniNewTrCard" data-color={`${tr.color}`}>
                                        <div>
                                            <span style={{ color: `${tr.color}` }}>{tr.icon}</span>
                                        </div>
                                        <h5 style={{ color: `${tr.color}` }}>{tr.title}</h5>
                                        <p>{tr.subTitle}</p>
                                    </div>
                                </Link>
                            </div>
                            )
                        })
                    }
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    )
}

export default NewTransaction;