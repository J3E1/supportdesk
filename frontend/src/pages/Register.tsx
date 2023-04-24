import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { FaUser } from 'react-icons/all';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

type Props = {};
type FormData = {
	name: string;
	email: string;
	password: string;
	password2: string;
};
const Register = (props: Props) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const dispatch = useAppDispatch();

	const { user, isError, isLoading, isSuccess, message } = useAppSelector(
		(state: RootState) => state.authReducer
	);

	const navigate = useNavigate();

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

		if (password !== password2) {
			toast.error("Passwords doesn't match!");
			return;
		} else {
			const userData = { name, email, password };
			dispatch(register(userData));
		}
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmitHandler}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							placeholder='Enter your name'
							name='name'
							id='name'
							value={name}
							onChange={onChangeHandler}
							required
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							placeholder='Confirm password'
							name='password2'
							id='password2'
							value={password2}
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
export default Register;
