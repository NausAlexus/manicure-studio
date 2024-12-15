import './Services.css';
import ServicesData from "../../../config/services-config.json";

function Services() {

	// Данные________________________________
	const servicesItemsData = ServicesData['services-items'];


	return (
		<div className='services-container'>

			<div className='services-items'>
				<ul className='services-grid'>
					{servicesItemsData.map((item) => (
						<li className='services-item' style={{backgroundImage: `url("${item.img}")`}}>
							<a className='services-link' href="#">{item.title}</a>
						</li>
					))}
				</ul>
			</div>

			<div className='services-reviews'></div>

		</div>
	);
};

export default Services;