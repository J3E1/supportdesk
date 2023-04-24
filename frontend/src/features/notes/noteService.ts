import { ticketData } from './../tickets/ticketTypes';
import axios from 'axios';
import { noteDataResponse } from './noteTypes';

const API_URL: string = 'http://localhost:5000/api/tickets/';

// const getNotes = async (token: string) => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	const response = await axios.get(API_URL, config);
// 	return response.data;
// };

const getNotes = async (ticketID: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.get<noteDataResponse[]>(
		API_URL + ticketID + '/notes',
		config
	);

	return data;
};
const createNote = async (
	ticketID: string,
	noteText: string,
	token: string
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.post<noteDataResponse>(
		API_URL + ticketID + '/notes',
		{ text: noteText },
		config
	);

	return data;
};
const deleteNote = async (ticketID: string, noteId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.delete<noteDataResponse>(
		API_URL + ticketID + '/notes/' + noteId,

		config
	);

	return data;
};
const updateNote = async (
	ticketID: string,
	noteId: string,
	token: string,
	noteText: string
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data, status } = await axios.put<noteDataResponse>(
		API_URL + ticketID + '/notes/' + noteId,
		{ text: noteText },
		config
	);

	return data;
};

const noteService = {
	// getNote,
	getNotes,
	createNote,
	deleteNote,
	updateNote,
};
export default noteService;
