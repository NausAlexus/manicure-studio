import './ReviewsMain.css';
import { useState, useEffect, useRef } from 'react';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import mainConfig from "../../../../config/main-config.json";

function ReviewsMain() {

    // Данные__________________________________
    const reviewsMainTitle = mainConfig['reviews-main'][0].title;
    const reviewsMainData = mainConfig['reviews-main'][0].slide

	return (
        <div className='reviews-main-container'>
            <h3>{reviewsMainTitle}</h3>
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

                {reviewsMainData.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div className='reviews-main-slider-wrapper'>
                            <p className='reviews'>{slide.reviews}</p>
                            <p className='reviews-name'>{slide.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            
            </Swiper>
        </div>
	);
};

export default ReviewsMain;