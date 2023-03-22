import { useState } from "react";
import Web3 from "web3";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

export default function AuthContext() {
    const getToken = () => {
        const tokenString = window.localStorage.getItem("spacebank_token");
        return tokenString;
    };

    const getUser = () => {
        const activeUser = window.localStorage.getItem("spacebank_user");
        return JSON.parse(activeUser);
    };

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const createAccount = () => {
        return web3.eth.accounts.create();
    };

    const getBalance = async () => {
        var account = getUser();
        return await web3.eth.getBalance(account.user.wallet.address);
    };

    const saveToken = (userToken, userData) => {
        window.localStorage.setItem("spacebank_token", userToken);
        window.localStorage.setItem("spacebank_user", JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
    };

    const deleteToken = () => {
        window.localStorage.removeItem("spacebank_token");
        window.localStorage.removeItem("spacebank_user");
        setToken(getToken());
        setUser(getUser());
    };

    return {
        setToken: saveToken,
        removeToken: deleteToken,
        createAccount,
        getBalance,
        token,
        user,
    };
}
