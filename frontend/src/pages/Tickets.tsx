import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { ticket, ticketData } from '../features/tickets/ticketTypes';

type Props = {};
const Tickets = (props: Props) => {
	const { tickets, isLoading, isSuccess } = useAppSelector(
		state => state.ticketReducer
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	if (isLoading) return <Spinner />;

	return (
		<>
			<BackButton url='/' />
			<h1>Tickets</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.length !== 0 &&
					tickets.map((ticket: ticket) => (
						<TicketItem key={ticket._id} ticket={ticket} />
					))}
			</div>
		</>
	);
};
export default Tickets;
