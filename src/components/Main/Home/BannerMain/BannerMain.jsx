import './BannerMain.css';
import MainConfig from "../../../../config/main-config.json";
import { useState, useEffect, useRef } from 'react';

function BannerMain() {

    // Состояния______________________________
    const [isVisible, setIsVisible] = useState(false);
    const  mainRef = useRef(null);

    // Данные_________________________________
    const bgUrl = MainConfig['banner-main'][0].url;
    const bannerMainData = MainConfig['banner-main'][0];

    useEffect(() => {
        // Создаём Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting); // Обновляем состояние видимости
            });
        });

        if (mainRef.current) {
            observer.observe(mainRef.current); // Наблюдаем за элементом
        }

        // Удаляем наблюдателя при размонтировании
        return () => {
            if (mainRef.current) {
                observer.unobserve(mainRef.current);
            }
        };
    }, [mainRef]);

	return (
		<div className='banner-main-container' style={{ backgroundImage: `url(${bgUrl})` }}>
            <div ref={mainRef} className='banner-main-wrapper' style={{opacity: isVisible ? 1 : 0,}}>
                <p>{bannerMainData.text}</p>
                <h1>{bannerMainData.title}</h1>
                <button>{bannerMainData['text-btn']}</button>
            </div>
        </div>
	);
};

export default BannerMain;