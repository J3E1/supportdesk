import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { logout, reset } from '../features/auth/authSlice';
import { UserData } from '../features/auth/authTypes';

type Props = {};
const Header = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	let isLoggedIn: boolean;
	const { user } = useAppSelector((state: RootState) => state.authReducer);
	// console.log('🚀 ~ file: Header.tsx:14 ~ Header ~ user', user);
	if (Object.keys(user).length === 0) isLoggedIn = false;
	else isLoggedIn = true;

	const logoutHandler = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Support Desk</Link>
			</div>
			<ul>
				{isLoggedIn ? (
					<li>
						<button className='btn' onClick={logoutHandler}>
							<FaSignInAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt />
								LogIn
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};
export default Header;
