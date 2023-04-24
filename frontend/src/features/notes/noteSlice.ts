import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../util/extractErrorMessage';
import noteService from './noteService';
import { initialState, note, noteState } from './noteTypes';

const initialState: initialState = {
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getNotes = createAsyncThunk(
	'notes/getAll',
	async (ticketId: string, { getState, rejectWithValue }) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as noteState;

			return await noteService.getNotes(ticketId, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const createNote = createAsyncThunk(
	'notes/create',
	async (
		{ noteText, ticketId }: { noteText: string; ticketId: string },
		{ getState, rejectWithValue }
	) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as noteState;

			return await noteService.createNote(ticketId, noteText, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const updateNote = createAsyncThunk(
	'notes/update',
	async (
		{
			noteText,
			ticketId,
			noteId,
		}: { noteText: string; ticketId: string; noteId: string },
		{ getState, rejectWithValue }
	) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as noteState;

			return await noteService.updateNote(ticketId, noteId, token, noteText);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const deleteNote = createAsyncThunk(
	'notes/delete',
	async (
		{ noteId, ticketId }: { noteId: string; ticketId: string },
		{ getState, rejectWithValue }
	) => {
		try {
			const {
				authReducer: {
					user: { token },
				},
			} = getState() as noteState;

			return await noteService.deleteNote(ticketId, noteId, token);
		} catch (error) {
			return rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: { reset: state => initialState },
	extraReducers(builder) {
		builder
			.addCase(getNotes.pending, state => {
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes = payload;
			})
			.addCase(getNotes.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(createNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(createNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes.push(payload);
			})
			.addCase(createNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(deleteNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.notes = state.notes.filter(note => note._id !== payload._id);
			})
			.addCase(deleteNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			})
			.addCase(updateNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateNote.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				const i = state.notes.findIndex(note => note._id === payload._id);
				state.notes[i] = payload;
				state.notes.sort((a: any, b: any) => {
					return (
						new Date(b?.updatedAt).valueOf() - new Date(a?.updatedAt).valueOf()
					);
				});
				state.isSuccess = true;
			})
			.addCase(updateNote.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
			});
	},
});
export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
