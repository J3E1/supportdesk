export type ticket = {
	_id?: string;
	user?: string;
	product?: string;
	description?: string;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
};
export type ticketDataResponse = {
	_id?: string;
	_v: number;
	user?: string;
	product?: string;
	description?: string;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
};
export type ticketData = {
	name?: string;
	email?: string;
	product?: string;
	description?: string;
};
export type InitialState = {
	tickets: ticket[];
	ticket: ticket;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
};

export type ticketsState = {
	authReducer: { user: { token: string } };
};
