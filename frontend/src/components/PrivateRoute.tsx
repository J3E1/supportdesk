import { Outlet, Navigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';

type Props = {};
const PrivateRoute = (props: Props) => {
	const { loggedIn, loading } = useAuthStatus({});

	if (loading) return <Spinner />;

	return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoute;
