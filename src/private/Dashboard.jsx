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
    getAmountsOut,
} from "../helpers/pancakeswapHelper";
import { currencyList } from "../helpers/CurrencyHelper";
import CryptoIcons from "../utils/cryptoIcons";
import { successToast } from "../config";
import { user } from "../auth/authToken";
import { ImSpinner2, ImSpinner8 } from "react-icons/im";
import BalanceLoader from "../utils/balanceLoader";
import { convertDate } from "../utils/convertDate";
import { coinValue } from "../utils/coinValue";
import { transactionIcon } from "../utils/transactionIcon";

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
        setAllBalance(val);
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
                        <h3>${parseFloat(allBalance).toFixed(2)}</h3>
                        <p>
                            Total balance from all accounts <span>NGN</span>
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
                                        <h5>Income</h5>
                                        <span>
                                            <BsArrowUpRight />
                                        </span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>
                                            ${parseFloat(allBalance).toFixed(2)}
                                        </h4>
                                    </div>
                                    <div className="statsDivFooter">
                                        <p>
                                            {activeUser.transactions.length}{" "}
                                            Transactions
                                        </p>
                                        <span>+10%</span>
                                    </div>
                                </div>

                                <div className="statsDiv spendingStats">
                                    <div className="statsDivHeader">
                                        <h5>Spendings</h5>
                                        <span>
                                            <BsArrowDownLeft />
                                        </span>
                                    </div>
                                    <div className="statsDivContent">
                                        <h4>
                                            $
                                            {
                                                activeUser.balances.deposits
                                                    .$numberDecimal
                                            }
                                        </h4>
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
                                                                <li key={index}>
                                                                    <div className="initialDiv">
                                                                        <CryptoIcons
                                                                            coin={
                                                                                curr.name
                                                                            }
                                                                        />
                                                                        <p>
                                                                            <span className="titleSpan">
                                                                                {
                                                                                    curr.name
                                                                                }
                                                                            </span>
                                                                            <span className="subtitleSpan">
                                                                                Wallet
                                                                                account
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p>
                                                                            <span className="titleSpan text-right">
                                                                                {bal
                                                                                    ? bal
                                                                                    : 0}{" "}
                                                                                {
                                                                                    curr.name
                                                                                }
                                                                            </span>
                                                                            <span className="subtitleSpan">
                                                                                Wallet
                                                                                balance
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </li>
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
                                                        <li key={index}>
                                                            <div className="initialDiv">
                                                                <img
                                                                    src={transactionIcon(
                                                                        transaction
                                                                    )}
                                                                    style={{
                                                                        width: "26px",
                                                                        height: "26px",
                                                                    }}
                                                                    alt="Transaction Card Icon"
                                                                />
                                                                <p>
                                                                    <span className="titleSpan">
                                                                        {
                                                                            transaction.description
                                                                        }
                                                                    </span>
                                                                    <span className="subtitleSpan">
                                                                        {convertDate(
                                                                            transaction.createdAt,
                                                                            "fulldate"
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    <span className="titleSpan text-right">
                                                                        {
                                                                            transaction.amount
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </li>
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
