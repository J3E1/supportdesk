export type UserData = {
	name?: string;
	email?: string;
	password?: string;
};
export type UserDataResponse = {
	name?: string;
	email?: string;
	token?: string;
	_id?: string;
};
export type InitialState = {
	user: UserData;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
};
