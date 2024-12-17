import './Header.css';
import { FaInstagram } from "react-icons/fa6";
import { GrMailOption } from "react-icons/gr";
import HeaderConfig from "../../config/header-config.json";
import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';

// Оптимизируем компонент NavLink______________
const NavLink = memo(({ link }) => (
    <li key={link.id}>
        <Link to={link.path}>{link.name}</Link>
    </li>
));

function Header() {
    // Состояния
    const [headerTop, setHeaderTop] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const headerRef = useRef(null);

    // Вывод данных из config
    const logoText = HeaderConfig['header-logo'][0];
    const navLinks = HeaderConfig['nav-link'];
    const socialPath = HeaderConfig['nav-social'][0];
    const headerBtnText = HeaderConfig['nav-btn'][0].text;

    // Функция обработки скролла
    const handleScroll = () => {
        setHeaderTop(window.scrollY > 50 ? -100 : 0);
    };

    useEffect(() => {
        // Создаем Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting);
            });
        });

        const currentRef = headerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Настройка события скролла
        window.addEventListener('scroll', handleScroll);

        // Очистка эффекта при размонтировании
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header ref={headerRef} className='header-container' style={{ top: `${headerTop}px`, opacity: isVisible ? 1 : 0 }}>
            <Link to={logoText.path} className='header-logo'>{logoText.logo}</Link>
            <div className="header-content">
                <nav className='nav'>
                    <ul>
                        {navLinks.map(link => (
                            <NavLink key={link.id} link={link} />
                        ))}
                    </ul>
                </nav>
                <div className='header-social'>
                    <ul>
                        <li><a href={socialPath.path} aria-label="Instagram"><FaInstagram /></a></li>
                        <li><a href={socialPath.path} aria-label="Email"><GrMailOption /></a></li>
                    </ul>
                </div>
                <button className='header-btn'>{headerBtnText}</button>
            </div>
        </header>
    );
};

export default Header;