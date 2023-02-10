import { useState } from 'react';
import Web3 from "web3";

export default function AuthToken() {

	const web3 = new Web3('https://bsc-dataseed.binance.org/')

	function createAccount() {
		return(web3.eth.accounts.create())
	}

	const getBalance = async () => {
		var account = getUser();
		console.log("ACCOUNT: ", account);

		console.log("GOT HERE");
		return await web3.eth.getBalance("0xA946656472D1593550EF66ea31f29d4323e83329");
	}

	const getToken = () => {
		const tokenString = window.localStorage.getItem('spacebank_token');
		return tokenString;
	};

	const getUser = () => {
		const activeUser = window.localStorage.getItem('spacebank_user');
		return JSON.parse(activeUser);
	}

	const [token, setToken] = useState(getToken());
	const [user, setUser] = useState(getUser());

	const saveToken = (userToken, userData) => {
		window.localStorage.setItem('spacebank_token', userToken);
		window.localStorage.setItem('spacebank_user', JSON.stringify(userData));
		setToken(userToken);
		setUser(userData);
	}

	const deleteToken = () => {
		window.localStorage.removeItem('spacebank_token');
		window.localStorage.removeItem('spacebank_user');
		setToken(getToken());
		setUser(getUser());
	}

	return {
		setToken: saveToken,
		removeToken: deleteToken,
		getBalance: getBalance,
		createAccount: createAccount,
		token,
		user,
	}

}