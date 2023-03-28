import ProtectedLayout from "../layout/ProtectedLayout";
import { successToast } from "../config";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { coinValue } from "../utils/coinValue";
import { currencyList } from "../helpers/CurrencyHelper";
import CryptoIcons from "../utils/cryptoIcons";
import BalanceLoader from "../utils/balanceLoader";

const Accounts = ({
    activeUser,
    token,
    balance,
    balances,
    loading,
    reloadUser,
    removeToken,
}) => {
    const [allBalance, setAllBalance] = useState(0);
    const [allBalanceJSON, setAllBalanceJSON] = useState({});

    useEffect(() => {
        const val = coinValue(
            balances[0],
            balances[1],
            balances[2],
            balances[3],
            "dollar",
            true
        );
        const jsonBL = coinValue(
            balances[0],
            balances[1],
            balances[2],
            balances[3],
            "dollar"
        );

        setAllBalance(val);
        setAllBalanceJSON(jsonBL);
        return;
    }, [balances, setAllBalance, setAllBalanceJSON]);

    // const copyAddress = (e) => {
    //     e.preventDefault();
    //     if (navigator.clipboard) {
    //         window.navigator.clipboard.writeText(
    //             activeUser.user.wallet.address
    //         );
    //         successToast("Wallet address successfully copied");
    //     } else {
    //         alert(`Copy Address: ${activeUser.user.wallet.address}`);
    //     }
    // };

    return (
        <ProtectedLayout
            navTitle="Accounts"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="accountSection">
                <div className="transactionSectionHeader">
                    <div>
                        <h4>${parseFloat(allBalance).toFixed(2)}</h4>
                        <p>
                            Total balance from all accounts <span>USD</span>
                        </p>
                    </div>
                    <div>
                        <Link to="/transactions/new">
                            <AiOutlinePlusCircle /> Open an account
                        </Link>
                    </div>
                </div>

                <div className="accountSectionContent">
                    <div className="row">
                        {!loading.loading ? (
                            <>
                                {balances.length > 0 ? (
                                    <>
                                        {currencyList.map((curr, index) => {
                                            let bal = balances[index];
                                            let currencyBalance;

                                            Object.keys(allBalanceJSON).map(
                                                (key, index) => {
                                                    if (
                                                        key ===
                                                        curr.name.toLocaleLowerCase()
                                                    ) {
                                                        currencyBalance =
                                                            Object.values(
                                                                allBalanceJSON
                                                            )[index];
                                                        return;
                                                    }
                                                }
                                            );

                                            return (
                                                <div
                                                    className="col-xl-6"
                                                    key={index}
                                                >
                                                    <div className="accountCurrCard">
                                                        <div className="currHeader">
                                                            <p>
                                                                <span>
                                                                    {curr.name}
                                                                </span>{" "}
                                                                <span>
                                                                    {activeUser.user.wallet.address.slice(
                                                                        0,
                                                                        15
                                                                    )}
                                                                    ******
                                                                </span>
                                                            </p>
                                                            <CryptoIcons
                                                                coin={curr.name}
                                                            />
                                                        </div>
                                                        <div className="currContent">
                                                            <h3>
                                                                {bal
                                                                    ? parseFloat(
                                                                          bal
                                                                      ).toFixed(
                                                                          2
                                                                      )
                                                                    : 0}{" "}
                                                                {curr.name}
                                                            </h3>
                                                            <p>
                                                                <span>
                                                                    Dollar
                                                                    conversion:
                                                                    $
                                                                    {parseFloat(
                                                                        currencyBalance
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                </span>
                                                                <span>
                                                                    <Link to="/transactions">
                                                                        Transactions
                                                                    </Link>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <BalanceLoader loading={loading} />
                                )}
                            </>
                        ) : (
                            <BalanceLoader loading={loading} />
                        )}
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    );
};

export default Accounts;
