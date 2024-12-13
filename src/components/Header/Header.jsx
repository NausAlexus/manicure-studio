import './Header.css';
import { FaInstagram } from "react-icons/fa6";
import { GrMailOption } from "react-icons/gr";
import HeaderConfig from "../../config/header-config.json";
import { useState, useEffect, useRef } from 'react';

function Header() {

    // Состояния________________________________________________
    const [headerTop, setHeaderTop] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // Состояние для видимости
    const headerRef = useRef(null); // Реф для отслеживания заголовка

    // Вывод данных из config_____________________________________
    const logoText = HeaderConfig['header-logo'][0];
    const navLinks = HeaderConfig['nav-link'];
    const socialPath = HeaderConfig['nav-social'][0];
    const headerBtnText = HeaderConfig['nav-btn'][0].text;

    // Функции__________________________________________________
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setHeaderTop(-100);
        } else {
            setHeaderTop(0);
        }
    };

    useEffect(() => {
        // Создаём Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting); // Обновляем состояние видимости
            });
        });

        if (headerRef.current) {
            observer.observe(headerRef.current); // Наблюдаем за элементом
        }

        // Удаляем наблюдателя при размонтировании
        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current);
            }
        };
    }, [headerRef]);

    // Побочные эффекты_________________________________________
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Удаляем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

	return (
        <header ref={headerRef} className='header-container' style={{top: `${headerTop}px`, opacity: isVisible ? 1 : 0}}>
            <a href={logoText.path} className='header-logo'>{logoText.logo}</a>
            <div className="header-content">
                <nav className='nav'>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.id}><a href={link.path}>{link.name}</a></li>
                        ))}
                    </ul>
                </nav>
                <div className='header-social'>
					<ul>
						<li><a href={socialPath.path}><FaInstagram /></a></li>
						<li><a href={socialPath.path}><GrMailOption /></a></li>
					</ul>
                </div>
				<button className='header-btn'>{headerBtnText}</button>
            </div>
        </header>
	);
};

export default Header;