import ProtectedLayout from "../layout/ProtectedLayout";
import { RiAddCircleLine } from "react-icons/ri";
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TrPinModal from "../components/modal/TrPinModal";
import { useCycle } from "framer-motion";
import SendAssetModal from "../components/modal/SendAssetModal";
import {
    getBalanceOfToken,
    sendETH,
    sendTOKEN,
} from "../helpers/pancakeswapHelper";
import { currencyList } from "../helpers/CurrencyHelper";
import { successToast } from "../config";
import BalanceLoader from "../utils/balanceLoader";
import { coinValue } from "../utils/coinValue";
import SingleTrList from "../components/card/SingleTrList";
import SingleCoinList from "../components/card/SingleCoinList";
import {
    getInFlowTransactions,
    getOutFlowTransactions,
} from "../utils/transactionUtility";
import { bnbToDollar } from "../utils/currenyConverter";

const Dashboard = ({
    activeUser,
    token,
    balance,
    balances,
    loading,
    reloadUser,
    removeToken,
}) => {
    const [pinModal, cyclePinModal] = useState(false);
    const [assetModal, cycleAssetModal] = useCycle(false, true);
    const [transactions, setTransactions] = useState([]);
    const [allBalance, setAllBalance] = useState(0);
    const [hideBalance, setHideBalance] = useState(false);
    // const [currency, setCurrency] = useState(["", "BNB", 18]);
    // const [currencyTo, setCurrencyTo] = useState([
    //     "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    //     "BUSD",
    //     18,
    // ]);
    // const [slippage, setSlippage] = useState(0.5);

    useEffect(() => {
        setTransactions(activeUser.transactions);
        const val = coinValue(
            balances[0],
            balances[1],
            balances[2],
            balances[3],
            "dollar",
            true
        );
        setAllBalance(val ? val : 0);
        return;
    }, [balances, activeUser, setAllBalance]);

    const copyAddress = (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
            window.navigator.clipboard.writeText(
                activeUser.user.wallet.address
            );
            successToast("Wallet address successfully copied");
        } else {
            alert(`Copy Address: ${activeUser.user.wallet.address}`);
        }
    };

    return (
        <ProtectedLayout
            navTitle="Dashboard"
            user={activeUser}
            removeToken={removeToken}
        >
            <TrPinModal
                cyclePinModal={cyclePinModal}
                pinModal={pinModal}
                token={token}
            />
            <SendAssetModal
                assetModal={assetModal}
                cycleAssetModal={cycleAssetModal}
                walletBalance={balance}
                balances={balances}
                activeUser={activeUser}
                getBalanceOfToken={getBalanceOfToken}
                sendETH={sendETH}
                sendTOKEN={sendTOKEN}
                token={token}
                reloadUser={reloadUser}
            />
            <section className="dashboardSection">
                <div className="dashboardHeader">
                    <div className="currentBalance">
                        <h3>
                            <span
                                className={hideBalance ? "blurBalance" : ""}
                                onClick={() => setHideBalance(!hideBalance)}
                            >
                                ${parseFloat(allBalance).toFixed(2)}
                            </span>
                        </h3>
                        <p>
                            Total balance from all accounts <span>USD</span>
                        </p>
                    </div>
                    <div className="openAccount">
                        {/* <button><RiAddCircleLine /> Make a P2P Transaction</button> */}
                        <Link to="/transactions/new" id="p2pTransactionLink">
                            <RiAddCircleLine /> Make a Transaction
                        </Link>
                    </div>
                </div>
                <div className="dashboardContent">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="dashboardStats">
                                <div className="statsDiv incomeStats">
                                    <div className="statsDivHeader">
                                        <h5>Inflow</h5>
                                        <span>
                                            <BsArrowUpRight />
                                        </span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>
                                            <span
                                                className={
                                                    hideBalance
                                                        ? "blurBalance"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    setHideBalance(!hideBalance)
                                                }
                                            >
                                                $
                                                {bnbToDollar(
                                                    getInFlowTransactions(
                                                        transactions,
                                                        "total-amount"
                                                    )
                                                ).toFixed(2)}
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="statsDivFooter">
                                        <p>
                                            {getInFlowTransactions(
                                                transactions,
                                                "length"
                                            )}{" "}
                                            Transactions
                                        </p>
                                        {/* <span>+10%</span> */}
                                    </div>
                                </div>

                                <div className="statsDiv spendingStats">
                                    <div className="statsDivHeader">
                                        <h5>Outflow</h5>
                                        <span>
                                            <BsArrowDownLeft />
                                        </span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>
                                            <span
                                                className={
                                                    hideBalance
                                                        ? "blurBalance"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    setHideBalance(!hideBalance)
                                                }
                                            >
                                                $
                                                {getOutFlowTransactions(
                                                    transactions,
                                                    "total-amount"
                                                ).toFixed(5)}
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="statsDivFooter">
                                        <p>
                                            {getOutFlowTransactions(
                                                transactions,
                                                "length"
                                            )}{" "}
                                            Transactions
                                        </p>
                                        {/* <span>-2%</span> */}
                                    </div>
                                </div>
                            </div>

                            <div className="dashboardAccountStats">
                                <div className="accountStatsHeader">
                                    <h4>Your Assets</h4>
                                    <button onClick={cycleAssetModal}>
                                        Send Token
                                    </button>
                                </div>
                                <div className="accountWalletAddress">
                                    <span onClick={copyAddress}>
                                        {activeUser.user.wallet.address}
                                    </span>
                                </div>
                                {/* <div className="accountStatsChart">

                                </div> */}
                                <div className="accountStatsContent">
                                    {!loading.loading ? (
                                        <ul>
                                            {balances.length > 0 ? (
                                                <>
                                                    {currencyList.map(
                                                        (curr, index) => {
                                                            let bal =
                                                                balances[index];
                                                            return (
                                                                <SingleCoinList
                                                                    key={index}
                                                                    curr={curr}
                                                                    bal={bal}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </>
                                            ) : (
                                                <BalanceLoader
                                                    loading={loading}
                                                />
                                            )}
                                        </ul>
                                    ) : (
                                        <BalanceLoader loading={loading} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 customCol">
                            <div className="transactionStatsDiv">
                                <div className="transactionStatsHeader">
                                    <h4>Latest Transactions</h4>
                                    <span>
                                        <BsArrowUpRight />
                                    </span>
                                </div>
                                {transactions.length !== 0 ? (
                                    <div className="transactionStatsContent">
                                        <ul>
                                            {transactions
                                                .slice(0, 7)
                                                .map((transaction, index) => {
                                                    return (
                                                        <SingleTrList
                                                            key={index}
                                                            transaction={
                                                                transaction
                                                            }
                                                        />
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="transactionStatsContent">
                                        <div className="emptyContent">
                                            <img
                                                src="https://res.cloudinary.com/ruthless-labs/image/upload/v1672159101/spacebank/kyoagcmvrxjxwztyfdw0.png"
                                                style={{
                                                    width: "430px",
                                                    height: "200px",
                                                }}
                                            />
                                            <h5>No Transaction</h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    );
};

export default Dashboard;
