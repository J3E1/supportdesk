import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteNote, reset } from '../features/notes/noteSlice';
import { note } from '../features/notes/noteTypes';
import ModalComponent from './ModalComponent';
import './NoteItem.scss';
import Spinner from './Spinner';

type Props = {
	note: note;
	ticketId: string;
};
const NoteItem = ({
	note: { isStaff, text, createdAt, updatedAt, _id: noteId },
	ticketId,
}: Props) => {
	const { user } = useAppSelector(state => state.authReducer);
	const { notes, isLoading, message, isSuccess } = useAppSelector(
		state => state.noteReducer
	);

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const deleteNoteHandler = () => {
		noteId && dispatch(deleteNote({ noteId, ticketId }));
		isSuccess
			? toast.success('Note deleted successfully!')
			: toast.error('Something went wrong!');
	};
	const editNoteHandler = () => {
		openModal();
		// noteId && dispatch(deleteNote({ noteId, ticketId }));
		// isSuccess
		// 	? toast.success('Note deleted successfully!')
		// 	: toast.error('Something went wrong!');
	};
	if (isLoading) return <Spinner />;
	return (
		<div
			className='note'
			style={{
				backgroundColor: isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
				color: isStaff ? '#fff' : '#000',
			}}>
			<h4>
				Note from {isStaff ? <span>Staff</span> : <span>{user.name}</span>}
			</h4>
			<p>{text}</p>
			<div className='note-date'>
				{createdAt === updatedAt
					? createdAt &&
					  `Created at ${new Date(createdAt).toLocaleString('en-IN')}`
					: updatedAt &&
					  `Edited at ${new Date(updatedAt).toLocaleString('en-IN')}`}
			</div>

			<button
				className='btn--custom btn--custom--delete'
				onClick={deleteNoteHandler}>
				Remove
			</button>
			<button
				className='btn--custom btn--custom--edit'
				onClick={editNoteHandler}>
				Edit
			</button>
			<ModalComponent
				ticketId={ticketId ?? ''}
				responseType='update'
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				noteId={noteId}
				text={text}
			/>
		</div>
	);
};
export default NoteItem;
