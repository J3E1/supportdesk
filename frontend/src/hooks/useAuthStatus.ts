import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';

type Props = {};
const useAuthStatus = (props: Props) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const { user } = useAppSelector(state => state.authReducer);

	useEffect(() => {
		Object.keys(user).length !== 0 ? setLoggedIn(true) : setLoggedIn(false);

		setLoading(false);
	}, [user]);

	return { loading, loggedIn };
};
export default useAuthStatus;
