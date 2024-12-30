import './MasterSelect.css';
import serviceData from '../../../config/reservation-config.json'

function MasterSelect() {

	const serviceMasterData = serviceData.manicure;

	return (
		<div className='master-select'>
            <h3 className='master-select-title'>Выбор специалиста:</h3>
            <ul className='master-select-items'>
				{serviceMasterData.map(el => (
					<li className='master-select-item' key={el.id}>
						<img className='master-select-img' src={el.avatar} alt="Master" />
						<div>
							<h3>{el.name}</h3>
							<p>{el.role}</p>
							<p >⭐{el.rating.toFixed(1)}</p>
						</div>
					</li>
				))}
            </ul>
		</div>
	);
};

export default MasterSelect;