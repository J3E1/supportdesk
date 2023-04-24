import { Link } from 'react-router-dom';
import { ticket } from '../features/tickets/ticketTypes';

type Props = {
	ticket: ticket;
};
const TicketItem = ({ ticket }: Props) => {
	return (
		<div className='ticket'>
			<div>
				{ticket.createdAt && new Date(ticket.createdAt).toLocaleString('en-IN')}
			</div>
			<div>{ticket.product}</div>
			<div className={`status status-${ticket.status}`}>{ticket.status}</div>
			<Link to={`/ticket/${ticket._id}`} className='btn btn--reverse btn--sm'>
				View
			</Link>
		</div>
	);
};
export default TicketItem;
