import './Header.css';
import { FaInstagram } from "react-icons/fa6";
import { GrMailOption } from "react-icons/gr";
import HeaderConfig from "../../config/header-config.json";
import { useState, useEffect } from 'react';

function Header() {

    // Состояния________________________________________________
    const [headerTop, setHeaderTop] = useState(0);

    // Вывод данных из config_____________________________________
    const logoText = HeaderConfig['header-logo'][0];
    const navLinks = HeaderConfig['nav-link'];
    const socialPath = HeaderConfig['nav-social'][0];
    const headerBtnText = HeaderConfig['nav-btn'][0].name;

    // Функции__________________________________________________
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setHeaderTop(-100);
        } else {
            setHeaderTop(0);
        }
    };

    // Побочные эффекты_________________________________________
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Удаляем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

	return (
        <header className='header-container' style={{ top: `${headerTop}px` }}>
            <a href={logoText.path} className='header-logo'>{logoText.logo}</a>
            <div className="header-content">
                <nav className='nav'>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.name}><a href={link.path}>{link.name}</a></li>
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