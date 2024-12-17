import './Services.css';
import ServicesData from "../../../config/services-config.json";

function Services() {

	// Данные________________________________
	const servicesItemsData = ServicesData['services-items'];
	const serviceReviewsImg = ServicesData['services-reviews'][0].img;
	const serviceReviewsText = ServicesData['services-reviews'][0].text;
	const serviceReviewsName = ServicesData['services-reviews'][0].name;

	return (
		<div className='services-container'>

			<div className='services-items'>
				<ul className='services-grid'>
					{servicesItemsData.map((item) => (
						<li key={item.title} className='services-item' style={{backgroundImage: `url("${item.img}")`}}>
							<a className='services-link' href="#">{item.title}</a>
						</li>
					))}
				</ul>
			</div>

			<div className='services-reviews'>
				<img className='services-reviews-img' src={serviceReviewsImg} alt="Img" />
				<div className='services-reviews-content'>
					<p className='services-reviews-text'>{serviceReviewsText}</p>
					<p className='services-reviews-name'>{serviceReviewsName}</p>
				</div>
			</div>

		</div>
	);
};

export default Services;