import './ReviewsMain.css';
import { useState, useEffect, useRef } from 'react';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import mainConfig from "../../../config/main-config.json";

function ReviewsMain() {

    // Состояния_____________________________
    const [isVisible, setIsVisible] = useState(false);
    const reviewsRef = useRef(null);

    // Данные__________________________________
    const reviewsMainTitle = mainConfig['reviews-main'][0].title;
    const reviewsMainData = mainConfig['reviews-main'][0].slide




    useEffect(() => {
        const canvas = document.getElementById('snow-canvas');
        const ctx = canvas.getContext('2d');
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const snowflakes = [];
        const numFlakes = 1000;
    
        // Снежинка
        class Snowflake {
          constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1 + 1;
            this.speed = Math.random() * 1 + 0.05;
          }
    
          update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
              this.y = 0;
              this.x = Math.random() * canvas.width;
            }
          }
    
          draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.511)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fill();
          }
        }
    
        // Создаем снежинки
        for (let i = 0; i < numFlakes; i++) {
          snowflakes.push(new Snowflake());
        }
    
        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let snowflake of snowflakes) {
            snowflake.update();
            snowflake.draw();
          }
          requestAnimationFrame(animate);
        }
    
        animate();
    
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
    
        // Очистка эффекта при размонтировании компонента
        return () => {
          window.removeEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          });
        };
    }, []);

    useEffect(() => {
        // Создаём Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting); // Обновляем состояние видимости
            });
        });

        if (reviewsRef.current) {
            observer.observe(reviewsRef.current); // Наблюдаем за элементом
        }

        // Удаляем наблюдателя при размонтировании
        return () => {
            if (reviewsRef.current) {
                observer.unobserve(reviewsRef.current);
            }
        };
    }, []);

	return (
        <div className='reviews-main-container' ref={reviewsRef} style={{ opacity: isVisible ? 1 : 0}}>
            <canvas id='snow-canvas'></canvas>
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