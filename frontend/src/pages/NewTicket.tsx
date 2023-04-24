import { useAppSelector, useAppDispatch } from '../app/hooks';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

type Props = {};
const NewTicket = (props: Props) => {
	const { user } = useAppSelector(state => state.authReducer);
	// if (user === null || !user) return <h1>User not found!</h1>;

	const { isError, isLoading, message, isSuccess } = useAppSelector(
		state => state.ticketReducer
	);

	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess) {
			dispatch(reset());
			navigate('/tickets');
		}
	}, [dispatch, isError, isSuccess, navigate, message]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createTicket({ name, email, product, description }));
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<BackButton url='/' />
			<section className='heading'>
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className='form'>
				<div className='form-group'>
					<label htmlFor='name'>Customer Name</label>
					<input type='text' className='form-control' value={name} disabled />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Customer Email</label>
					<input type='text' className='form-control' value={email} disabled />
				</div>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='product'>Product</label>
						<select
							name='product'
							id='product'
							value={product}
							onChange={e => setProduct(e.target.value)}>
							{['iPhone', 'iPad', 'iPod', 'MacBook'].map((product, index) => (
								<option key={index} value={product}>
									{product}
								</option>
							))}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Description of the issue</label>
						<textarea
							name='description'
							id='description'
							className='form-control'
							placeholder='Description'
							value={description}
							onChange={e => setDescription(e.target.value)}></textarea>
					</div>
					<div className='form-group'>
						<button className='btn btn--block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default NewTicket;
