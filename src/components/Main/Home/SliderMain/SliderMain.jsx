import './SliderMain.css';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import mainConfig from "../../../../config/main-config.json";

function SliderMain() {

    // Данные________________________________
    const sliderTitle = mainConfig['slider-main'][0].title;
    const sliderData = mainConfig['slider-main'][0].slide;

	return (
		<div className='slider-main-container'>
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
                    slidesPerView: 1.2, // 1 слайд от 0 до 768
                    spaceBetween: 20,
                },
                425: {
                    slidesPerView: 2.2, // 2 слайд от 0 до 768
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3.2, // 3 слайда от 768 до 1024
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4.2, // 4 слайда от 1024 до 1400
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