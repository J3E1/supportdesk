import axios from 'axios';
import { UserData, UserDataResponse } from './authTypes';

const API_URL: string = 'http://localhost:5000/api/users';

const register = async (userData: UserData) => {
	const { data, status } = await axios.post<UserDataResponse>(
		API_URL + '/register',
		userData
	);

	if (data) {
		localStorage.setItem('user', JSON.stringify(data));
	}
	return data;
};

const login = async (userData: UserData) => {
	const { data, status } = await axios.post<UserDataResponse>(
		API_URL + '/login',
		userData
	);

	if (data) {
		localStorage.setItem('user', JSON.stringify(data));
	}
	return data;
};

const logout = () => localStorage.removeItem('user');

const authService = {
	register,
	logout,
	login,
};
export default authService;
