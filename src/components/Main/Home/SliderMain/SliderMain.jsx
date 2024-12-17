import './SliderMain.css';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import mainConfig from "../../../../config/main-config.json";
import { useState, useEffect, useRef } from 'react';

function SliderMain() {
    // Состояния_____________________________
    const [isVisible, setIsVisible] = useState(false);
    const sliderRef = useRef(null);

    // Данные________________________________
    const sliderTitle = mainConfig['slider-main'][0].title;
    const sliderData = mainConfig['slider-main'][0].slide;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                } else if (!entry.isIntersecting && isVisible) {
                    setIsVisible(false);
                }
            });
        });

        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => {
            if (sliderRef.current) {
                observer.unobserve(sliderRef.current);
            }
        };
    }, [isVisible]);

	return (
		<div className='slider-main-container' ref={sliderRef} style={{ opacity: isVisible ? 1 : 0}}>
            <h3>{sliderTitle}</h3>
            <Swiper
                spaceBetween={30}
                autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                }}
                
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="slider"
                breakpoints={{
                0: {
                    slidesPerView: 1, // 1 слайд от 0 до 768
                    spaceBetween: 20,
                },
                425: {
                    slidesPerView: 2, // 2 слайд от 0 до 768
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3, // 3 слайда от 768 до 1024
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4, // 4 слайда от 1024 до 1400
                    spaceBetween: 30,
                },
                1600: {
                    slidesPerView: 5, // 5 слайда от 1024 до 1400
                    spaceBetween: 30,
                },
                }}
            >

                {sliderData.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div className='slider-item-wrapper'>
                            <img className='slider-item' src={slide.image} alt="Slide"/>
                        </div>
                    </SwiperSlide>
                ))}
               
            </Swiper>
        </div>
	);
};

export default SliderMain;