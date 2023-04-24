import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { extractErrorMessage } from '../../util/extractErrorMessage';

import ticketService from './ticketService';
import { InitialState, ticket, ticketData, ticketsState } from './ticketTypes';

export const createTicket = createAsyncThunk(
	'tickets/create',
	async (ticketData: ticketData, { getState, rejectWithValue }) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as ticketsState;

			return await ticketService.createTicket(ticketData, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const getTickets = createAsyncThunk(
	'tickets/getAll',
	async (_, { getState, rejectWithValue }) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as ticketsState;

			// console.log('🚀 ~ file: ticketSlice.tsx:63 ~ user', user);
			return await ticketService.getTickets(token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const getTicket = createAsyncThunk(
	'tickets/get',
	async (ticketId: string, { getState, rejectWithValue }) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as ticketsState;

			// console.log('🚀 ~ file: ticketSlice.tsx:63 ~ user', user);
			return await ticketService.getTicket(ticketId, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const closeTicket = createAsyncThunk(
	'tickets/close',
	async (ticketId: string, { getState, rejectWithValue }) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as ticketsState;

			// console.log('🚀 ~ file: ticketSlice.tsx:63 ~ user', user);
			return await ticketService.closeTicket(ticketId, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);

const initialState: InitialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(createTicket.pending, state => {
				state.isLoading = true;
			})
			.addCase(createTicket.fulfilled, state => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createTicket.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(getTickets.pending, state => {
				state.isLoading = true;
			})
			.addCase(getTickets.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets = payload;
			})
			.addCase(getTickets.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(getTicket.pending, state => {
				state.isLoading = true;
			})
			.addCase(getTicket.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.ticket = payload;
			})
			.addCase(getTicket.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(closeTicket.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.tickets?.map((ticket: ticket) =>
					ticket._id === payload._id ? (ticket.status = 'closed') : ticket
				);
			});
	},
});

export const { reset } = ticketsSlice.actions;
export default ticketsSlice.reducer;
