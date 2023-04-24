import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/all';
import { toast } from 'react-toastify';
import { login } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

type Props = {};
type FormData = {
	email: string;
	password: string;
};
const Login = (props: Props) => {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { user, isError, message, isLoading, isSuccess } = useAppSelector(
		(state: RootState) => state.authReducer
	);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess && user) navigate('/');

		dispatch(reset());
	}, [isError, isSuccess, user, navigate, dispatch]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		setFormData(prevState => ({
			...prevState,
			email: prevState.email.toLowerCase(),
		}));
	};

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const userData = { email, password };
		dispatch(login(userData));
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmitHandler}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							placeholder='Enter your email'
							name='email'
							id='email'
							value={email}
							onChange={onChangeHandler}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							name='password'
							id='password'
							value={password}
							onChange={onChangeHandler}
							required
						/>
					</div>

					<div className='form-group'>
						<button className='btn btn--block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default Login;
