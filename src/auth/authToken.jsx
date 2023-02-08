import { useState } from 'react';

export default function AuthToken() {

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
		token,
		user,
	}

}