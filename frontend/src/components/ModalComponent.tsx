import { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createNote, updateNote } from '../features/notes/noteSlice';

const customStyles: Styles = {
	content: {
		maxWidth: '70%',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	},
};

type Props = {
	ticketId: string;
	responseType: string;
	noteId?: string;
	modalIsOpen: boolean;
	closeModal: () => void;
	text?: string;
};
const ModalComponent = ({
	ticketId,
	responseType,
	noteId,
	modalIsOpen,
	closeModal,
	text: defaultNoteText,
}: Props) => {
	const { isSuccess } = useAppSelector(state => state.noteReducer);

	const [noteText, setNoteText] = useState<string>('');

	const onNoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		responseType === 'create'
			? await dispatch(createNote({ noteText, ticketId }))
			: responseType === 'update'
			? noteId && (await dispatch(updateNote({ noteText, ticketId, noteId })))
			: null;
		closeModal();

		if (isSuccess) {
			if (responseType === 'create') {
				await toast.success('Note added successfully!');
			} else if (responseType === 'update') {
				await toast.success('Note updated successfully!');
			}
		} else {
			await toast.error('Something went wrong!');
		}
	};

	const dispatch = useAppDispatch();

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel='Add Note'>
			<h2>{responseType === 'create' ? 'Add' : 'Edit'} Note</h2>
			<button className='btn-close' onClick={closeModal}>
				X
			</button>
			<form onSubmit={onNoteSubmit}>
				<div className='form-group'>
					<textarea
						name='noteText'
						id='noteText'
						className='form-control'
						placeholder='Note text'
						value={noteText}
						onChange={e => setNoteText(e.target.value)}></textarea>
				</div>
				<div className='form-group'>
					<button className='btn' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</Modal>
	);
};
export default ModalComponent;
