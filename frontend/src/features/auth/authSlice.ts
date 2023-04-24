import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { extractErrorMessage } from '../../util/extractErrorMessage';

import authService from './authService';
import { InitialState, UserData } from './authTypes';

const user: UserData = JSON.parse(localStorage.getItem('user') || '{}');

// if (Object.keys(user).length === 0) {
// 	user = {};
// }

const initialState: InitialState = {
	user: user,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const register = createAsyncThunk(
	'auth/register',
	async (user: UserData, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);
export const login = createAsyncThunk(
	'auth/login',
	async (user: UserData, thunkAPI) => {
		try {
			return await authService.login(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(extractErrorMessage(error));
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	authService.logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = payload;
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
				state.user = {};
			})
			.addCase(logout.fulfilled, state => {
				state.user = {};
			})
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = payload;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof payload === 'string') state.message = payload;
				state.user = {};
			});
	},
});
export const { reset } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
