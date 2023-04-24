import axios from 'axios';
import { ticketData, ticketDataResponse } from './ticketTypes';

const API_URL: string = 'http://localhost:5000/api/tickets/';
// const createConfig = (token: string) => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	return config;
// };

const createTicket = async (ticketData: ticketData, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data, status } = await axios.post<ticketDataResponse>(
		API_URL,
		ticketData,
		config
	);

	return data;
};

const getTickets = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.get<ticketDataResponse[]>(
		API_URL,
		config
	);
	return data;
};
const getTicket = async (ticketID: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.get<ticketDataResponse>(
		API_URL + ticketID,
		config
	);

	return data;
};

const closeTicket = async (ticketID: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.put<ticketDataResponse>(
		API_URL + ticketID,
		{ status: 'closed' },
		config
	);

	return data;
};

const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	closeTicket,
};
export default ticketService;
