import Web3 from "web3";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

export const getToken = () => {
    const tokenString = window.localStorage.getItem("spacebank_token");
    return tokenString;
};

export const getUser = () => {
    const activeUser = window.localStorage.getItem("spacebank_user");
    return JSON.parse(activeUser);
};

export let token = getToken();
export let user = getUser();

export const createAccount = () => {
    return web3.eth.accounts.create();
};

export const getBalance = async () => {
    var account = getUser();
    return await web3.eth.getBalance(account.user.wallet.address);
};

export const setToken = (userToken, userData) => {
    window.localStorage.setItem("spacebank_token", userToken);
    window.localStorage.setItem("spacebank_user", JSON.stringify(userData));
    token = getToken();
    user = getUser();
};

export const removeToken = () => {
    window.localStorage.removeItem("spacebank_token");
    window.localStorage.removeItem("spacebank_user");
    token = getToken();
    user = getUser();
};
