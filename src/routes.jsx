import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from 'react-helmet-async';
import Login from "./auth/Login";
import AuthToken from './auth/authToken';
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

export const Router = () => {

    const { token, removeToken, setToken, user, createAccount, getBalance } = AuthToken();
    const [initialLoad, setInitialLoad] = useState(false);

    const reloadUser = () => {
        if (token){
            axios({
                method: "GET",
                headers: {
                    'x-auth-token': token,
                },
                url: `${API_URL}/users/${user.user._id}`,
            })
            .then((res) => {
                console.log("SUCCESS ON RELOAD: ", res);
                if (res.data.success){
                    setToken(token, res.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        if (initialLoad===false){
            reloadUser();
            setInitialLoad(true);
        }
    }, [initialLoad])

    const convertDate = (date, returnData) => {
        const dummyDate = new Date(String(date.split("T")[0]));
        const month = new Intl.DateTimeFormat("en-US", {month:"long"}).format(dummyDate);
        const day = dummyDate.getDate();
        
        if (returnData==="day"){
            return String(day);
        }
        if (returnData==="month"){
            return String(month.slice(0,3));
        }
    }

    return (
        <>
            <ToastContainer />
            <HelmetProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            token?
                            <Dashboard
                                token={token}
                                activeUser={user}
                                getBalance={getBalance}
                                removeToken={removeToken}
                                reloadUser={reloadUser}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/transactions"
                        element={
                            token?
                            <Transactions
                                token={token}
                                activeUser={user}
                                removeToken={removeToken}
                                reloadUser={reloadUser}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/transactions/new"
                        element={
                            token?
                            <NewTransaction
                                token={token}
                                activeUser={user}
                                removeToken={removeToken}
                                reloadUser={reloadUser}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/transactions/new/transfer"
                        element={
                            token?
                            <SendMoney
                                token={token}
                                activeUser={user}
                                removeToken={removeToken}
                                reloadUser={reloadUser}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/transactions/new/airtime"
                        element={
                            token?
                            <BuyAirtime
                                token={token}
                                activeUser={user}
                                removeToken={removeToken}
                                reloadUser={reloadUser}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            token?
                            <Settings
                                token={token}
                                activeUser={user}
                                removeToken={removeToken}
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/auth"
                        element={
                            token?
                            <Navigate
                                to="/"
                            />:
                            <Login
                                setToken={setToken}
                            />
                        }
                    />

                    <Route
                        path="/auth/register"
                        element={
                            token?
                            <Navigate
                                to="/"
                            />:
                            <Register
                                setToken={setToken}
                                createAccount={createAccount}
                                getBalance={getBalance}
                            />
                        }
                    />

                    <Route
                        path="/auth/verify"
                        element={
                            token?
                            <Navigate
                                to="/"
                            />:
                            <Verify
                                setToken={setToken}
                            />
                        }
                    />
                </Routes>
            </HelmetProvider>
        </>
    )
}