import './Services.css';
import ServicesData from "../../../config/services-config.json";
import { useState, useEffect, useRef } from 'react';

function Services() {
	// Состояние для видимости reviews
	const [isReviewsVisible, setReviewsVisible] = useState(false);

	// Ссылка на элемент reviews
	const reviewsRef = useRef(null);

	// Данные________________________________
	const servicesItemsData = ServicesData['services-items'];
	const serviceReviewsImg = ServicesData['services-reviews'][0].img;
	const serviceReviewsText = ServicesData['services-reviews'][0].text;
	const serviceReviewsName = ServicesData['services-reviews'][0].name;

	// useEffect для настройки Intersection Observer
	useEffect(() => {
		// Функция для создания и настройки Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Если элемент оказался в зоне видимости, обновляем состояние
					setReviewsVisible(true);
				}
			});
		});

		// Наблюдаем за элементом reviews
		if (reviewsRef.current) {
			observer.observe(reviewsRef.current);
		}

		// Очищаем наблюдателя при размонтировании
		return () => {
			if (reviewsRef.current) {
				observer.unobserve(reviewsRef.current);
			}
		};
	}, []);

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

			<div className='services-reviews' ref={reviewsRef}  style={{ opacity: isReviewsVisible ? 1 : 0}}>
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