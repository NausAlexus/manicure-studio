/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import "./Header.css";
import { FaInstagram } from "react-icons/fa6";
import { GrMailOption } from "react-icons/gr";
import HeaderConfig from "../../config/header-config.json";
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

// Оптимизируем компонент NavLink______________
const NavLink = memo(({ link }) => (
    <li key={link.id}>
        <Link to={link.path}>{link.name}</Link>
    </li>
));



function Header(props) {
    const [headerOpen, setHeaderOpen] = useState(false);
    
    const handleClick = () => {
        setHeaderOpen(!headerOpen)
    }
    // Состояния
    const [headerTop, setHeaderTop] = useState(0);

    // Вывод данных из config
    const logoText = HeaderConfig["header-logo"][0];
    const navLinks = HeaderConfig["nav-link"];
    const socialPath = HeaderConfig["nav-social"][0];
    const headerBtnText = HeaderConfig["nav-btn"][0].text;

    // Функция обработки скролла
    const handleScroll = useCallback(() => {
        setHeaderTop(window.scrollY > 50 ? -100 : 0);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="header-container" style={{ top: `${headerTop}px` }}>
            <Link to={logoText.path} className="header-logo">
                {logoText.logo}
            </Link>
            <div className={`header-content header-open-btn ${headerOpen ? 'visible' : ''}`}>
                <div className={`btn-close ${headerOpen ? 'visible' : ''}`}>
                    <IoCloseSharp onClick={handleClick}/>
                </div>
                <div className={`header-open-background ${headerOpen ? 'visible' : ''}`} onClick={handleClick}></div>

                <nav className="nav">
                    <ul onClick={handleClick}>
                        {navLinks.map((link) => (
                            <NavLink key={link.id} link={link}/>
                        ))}
                    </ul>
                </nav>
                <div className="header-social">
                    <ul>
                        <li>
                            <a href={socialPath.path} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        </li>
                        <li>
                            <a href={socialPath.path} aria-label="Email">
                                <GrMailOption />
                            </a>
                        </li>
                    </ul>
                </div>
                <button onClick={props.visibleClick} className="header-btn">
                    {headerBtnText}
                </button>
            </div>
            <RxHamburgerMenu onClick={handleClick}  className="header-burger-btn"/>
        </header>
    );
}

export default Header;
