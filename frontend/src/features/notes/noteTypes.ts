export type note = {
	user?: string;
	ticket?: string;
	text?: string;
	isStaff?: boolean;
	_id?: string;
	createdAt?: string;
	updatedAt?: string;
};
export type initialState = {
	notes: note[];
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
};
export type noteState = {
	authReducer: { user: { token: string } };
};
export type noteDataResponse = {
	createdAt: string;
	isStaff: boolean;
	text: string;
	ticket: string;
	updatedAt: string;
	user: string;
	_id: string;
};
