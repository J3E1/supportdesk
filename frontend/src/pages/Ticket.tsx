import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal, { Styles } from 'react-modal';

import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import BackButton from '../components/BackButton';
import ModalComponent from '../components/ModalComponent';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';
import { createNote, getNotes } from '../features/notes/noteSlice';
import { closeTicket, getTicket, reset } from '../features/tickets/ticketSlice';

Modal.setAppElement('#root');

type Props = {};
const Ticket = (props: Props) => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const { ticket, isError, isLoading, isSuccess } = useAppSelector(
		state => state.ticketReducer
	);
	const {
		notes,
		isLoading: noteIsLoading,
		message: notesMessage,
	} = useAppSelector(state => state.noteReducer);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const params = useParams();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(notesMessage);
		}

		ticketId && dispatch(getTicket(ticketId));
		ticketId && dispatch(getNotes(ticketId));
	}, [isError, ticketId, dispatch, notesMessage]);

	const onTicketClose = () => {
		ticketId && dispatch(closeTicket(ticketId));
		toast.success('Ticket closed');
		navigate('/tickets');
	};

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	if (isLoading || noteIsLoading) return <Spinner />;

	if (!ticket) {
		toast.error('Ticket did not found!');
		navigate('/');
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted:{' '}
					{ticket.createdAt &&
						new Date(ticket.createdAt).toLocaleString('en-IN')}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes</h2>
			</header>
			{ticket.status !== 'closed' && (
				<button onClick={openModal} className='btn'>
					<FaPlus /> Add Note
				</button>
			)}

			<ModalComponent
				ticketId={ticketId ?? ''}
				responseType='create'
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
			/>

			{notes ? (
				notes.map(note => (
					<NoteItem
						key={note._id}
						note={note}
						ticketId={ticketId ? ticketId : ''}
					/>
				))
			) : (
				<Spinner />
			)}
			{ticket.status !== 'closed' && (
				<button onClick={onTicketClose} className='btn btn--block btn--danger'>
					Close Ticket
				</button>
			)}
		</div>
	);
};
export default Ticket;
