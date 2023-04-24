import './Spinner.scss';

type Props = {};
const Spinner = (props: Props) => {
	return (
		// <div className='loadingSpinnerContainer'>
		// 	<div className='loadingSpinner'></div>
		// </div>
		// <div className='waterfall--container'>
		// 	<div className='waterfall'>
		// 		<div></div>
		// 		<div></div>
		// 		<div></div>
		// 		<div></div>
		// 		<div></div>
		// 	</div>
		// </div>
		<div className='sliding-tiles-bordered-container'>
			<div className='sliding-tiles-bordered'></div>
		</div>
	);
};
export default Spinner;
