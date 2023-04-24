import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/all';
type Props = {};
const Home = (props: Props) => {
	return (
		<>
			<section className='heading'>
				<h1>what do you need help with?</h1>
				<p>Please choose from an option bellow</p>
			</section>
			<Link to='/new-ticket' className='btn btn--reverse btn--block'>
				<FaQuestionCircle /> Create new tickets
			</Link>
			<Link to='/tickets' className='btn btn--block'>
				<FaTicketAlt /> View my tickets
			</Link>
		</>
	);
};
export default Home;
