import './Menu.css';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import MasterSelect from '../MasterSelect/MasterSelect';
import { useState } from 'react';

function Menu() {

	const [showService, setShowService] = useState(true);
	const handleShowService = () => {
		setShowService(false)
	}

	return (
		<div className='menu-container'>
			{showService ? (<ServiceSelect handleShowService={handleShowService}/>
		):(
			<MasterSelect/>)}
		</div>
	);
};

export default Menu;