import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Login from "./auth/Login";
import AuthContext from "./auth/authApp";
import Register from "./auth/Register";
import Verify from "./auth/Verify";
import Dashboard from "./private/Dashboard";
import Transactions from "./private/Transactions";
import NewTransaction from "./private/NewTransaction";
import SendMoney from "./private/transaction/SendMoney";
import BuyAirtime from "./private/transaction/BuyAirtime";
import Settings from "./private/Settings";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./config";
import BuyData from "./private/transaction/BuyData";
import PayBills from "./private/transaction/PayBills";
import GiftCard from "./private/transaction/GiftCard";
import {
    getBalanceOfToken,
    sendETH,
    sendTOKEN,
    getAmountsOut,
} from "./helpers/pancakeswapHelper";
import { currencyList } from "./helpers/CurrencyHelper";

export const Router = () => {
    const { token, removeToken, setToken, user, createAccount, getBalance } =
        AuthContext();
    const [balance, setBalance] = useState();
    const [balances, setBalances] = useState([0, 0, 0, 0]);
    const [loading, setLoading] = useState({
        loading: true,
        status: "in-progress",
        error: "",
    });
    const [initialLoad, setInitialLoad] = useState(false);

    async function getAllBalances(walletAddress) {
        let map = [];
        for (let i = 0; i < currencyList.length; i++) {
            if (currencyList[i].contract == "") {
                map.push(Number(balance));
            } else {
                map.push(
                    Number(
                        await getBalanceOfToken(
                            currencyList[i].contract,
                            walletAddress
                        )
                    ) /
                        10 ** 18
                );
            }
        }
        return map;
    }

    const reloadUser = () => {
        if (token) {
            axios({
                method: "GET",
                headers: {
                    "x-auth-token": token,
                },
                url: `${API_URL}/users/${user.user._id}`,
            })
                .then((res) => {
                    if (res.data.success) {
                        setToken(token, res.data.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (initialLoad === false) {
            reloadUser();
            const walletAddress = user.user.wallet.address;
            getBalance(walletAddress).then((bal) => {
                const tempBal = bal;
                setBalance(tempBal / 10 ** 18);

                getAllBalances(walletAddress)
                    .then((bal) => {
                        if (bal) {
                            var tempBalance = [
                                tempBal / 10 ** 18,
                                bal[1],
                                bal[2],
                                bal[3],
                            ];
                            setBalances(tempBalance);
                            console.log("BALL: ", tempBalance);
                            setTimeout(function () {
                                setLoading({
                                    loading: false,
                                    status: "success",
                                });
                            }, 500);
                        }
                    })
                    .catch((err) => {
                        console.log("ERR: ", err);
                        setLoading({
                            loading: false,
                            status: "failed",
                            error: "Network Error",
                        });
                    });
            });
            setInitialLoad(true);
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <HelmetProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            token ? (
                                <Dashboard
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                    balance={balance}
                                    balances={balances}
                                    loading={loading}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions"
                        element={
                            token ? (
                                <Transactions
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new"
                        element={
                            token ? (
                                <NewTransaction
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new/transfer"
                        element={
                            token ? (
                                <SendMoney
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new/airtime"
                        element={
                            token ? (
                                <BuyAirtime
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new/data"
                        element={
                            token ? (
                                <BuyData
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new/bill"
                        element={
                            token ? (
                                <PayBills
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/transactions/new/giftcard"
                        element={
                            token ? (
                                <GiftCard
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            token ? (
                                <Settings
                                    token={token}
                                    activeUser={user}
                                    removeToken={removeToken}
                                />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/auth"
                        element={
                            token ? (
                                <Navigate to="/" />
                            ) : (
                                <Login setToken={setToken} />
                            )
                        }
                    />

                    <Route
                        path="/auth/register"
                        element={
                            token ? (
                                <Navigate to="/" />
                            ) : (
                                <Register
                                    setToken={setToken}
                                    createAccount={createAccount}
                                    getBalance={getBalance}
                                />
                            )
                        }
                    />

                    <Route
                        path="/auth/verify"
                        element={
                            token ? (
                                <Navigate to="/" />
                            ) : (
                                <Verify setToken={setToken} />
                            )
                        }
                    />
                </Routes>
            </HelmetProvider>
        </>
    );
};
