import ProtectedLayout from "../layout/ProtectedLayout";
import { RiAddCircleLine } from "react-icons/ri";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";
import { accountsList, transactionStats } from "../data/dashboardStats";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TrPinModal from "../components/modal/TrPinModal";

const Dashboard = ({ activeUser, token }) => {

    const [pinModal, cyclePinModal] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let tempTransaction = [];
        if (!activeUser.transaction_pin===0){
            cyclePinModal(true);
        }
        tempTransaction = activeUser.airtime_purchases.concat(activeUser.bill_purchases);
        tempTransaction = tempTransaction.concat(activeUser.data_purchases);
        tempTransaction = tempTransaction.concat(activeUser.deposits);
        tempTransaction = tempTransaction.concat(activeUser.transfers);
        setTransactions(tempTransaction);        
    }, [])

    return (
        <ProtectedLayout
            navTitle="Dashboard"
            user={activeUser}
        >
            <TrPinModal
                cyclePinModal={cyclePinModal}
                pinModal={pinModal}
                token={token}
            />
            <section className="dashboardSection">
                <div className="dashboardHeader">
                    <div className="currentBalance">
                        <h3>₦{activeUser.balance}</h3>
                        <p>Total balance from all accounts <span>NGN</span></p>
                    </div>
                    <div className="openAccount">
                        {/* <button><RiAddCircleLine /> Make a P2P Transaction</button> */}
                        <Link to="/transactions/new/transfer" id="p2pTransactionLink">
                            <RiAddCircleLine /> Make a P2P Transaction
                        </Link>
                    </div>
                </div>
                <div className="dashboardContent">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="dashboardStats">

                                <div className="statsDiv incomeStats">
                                    <div className="statsDivHeader">
                                        <h5>Income</h5>
                                        <span><BsArrowUpRight /></span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>₦{activeUser.balance}</h4>
                                    </div>
                                    <div className="statsDivFooter">
                                        <p>84 Transactions</p>
                                        <span>+10%</span>
                                    </div>
                                </div>

                                <div className="statsDiv spendingStats">
                                    <div className="statsDivHeader">
                                        <h5>Spendings</h5>
                                        <span><BsArrowDownLeft /></span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>₦{activeUser.balance}</h4>
                                    </div>
                                    <div className="statsDivFooter">
                                        <p>58 Transactions</p>
                                        <span>-2%</span>
                                    </div>
                                </div>

                            </div>

                            <div className="dashboardAccountStats">
                                <div className="accountStatsHeader">
                                    <h4>Your Assets</h4>
                                </div>
                                <div className="accountStatsChart">

                                </div>
                                <div className="accountStatsContent">
                                    <ul>
                                    {
                                        accountsList.map((account, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="initialDiv">
                                                        <img
                                                            src={account.cardIcon}
                                                            style={{ width: "17px", height: "17px" }}
                                                            alt="Account List Icon"
                                                        />
                                                        <p>
                                                            <span className="titleSpan">{account.number}</span>
                                                            <span className="subtitleSpan">Account number</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            <span className="titleSpan text-right">{account.currency}{account.balance}</span>
                                                            <span className="subtitleSpan">account balance</span>
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 customCol">
                            <div className="transactionStatsDiv">
                                <div className="transactionStatsHeader">
                                    <h4>Latest Transactions</h4>
                                    <span><BsArrowUpRight /></span>
                                </div>
                                {
                                    transactions.length!==0?
                                    <div className="transactionStatsContent">
                                        <ul>
                                        {
                                            transactionStats.map((transaction, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="initialDiv">
                                                            <img
                                                                src={transaction.cardIcon}
                                                                style={{ width: "26px", height: "26px" }}
                                                                alt="Transaction Card Icon"
                                                            />
                                                            <p>
                                                                <span className="titleSpan">{transaction.purchase}</span>
                                                                <span className="subtitleSpan">{transaction.date}</span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                <span className="titleSpan text-right">{transaction.amount}</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </div>:
                                    <div className="transactionStatsContent">
                                        <div className="emptyContent">
                                            <img
                                                src="https://res.cloudinary.com/ruthless-labs/image/upload/v1672159101/spacebank/kyoagcmvrxjxwztyfdw0.png"
                                                style={{ width: "430px", height: "200px" }}
                                            />
                                            <h5>No Transactions</h5>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    )
}

export default Dashboard;