import "./Footer.css";
import FooterConfig from "../../config/footer-config.json";
import { FaInstagram } from "react-icons/fa6";
import { GrMailOption } from "react-icons/gr";
import { Link } from 'react-router-dom';

const Footer = () => {
    // Вывод данных из config_____________________________________

    const footerLeft = FooterConfig["footer-left"];
    const footerRigth = FooterConfig["footer-rigth"];
    const socialPaths = FooterConfig["footer-socials"];
    const iconMap = {
        instagram: <FaInstagram />,
        email: <GrMailOption />,
    };

    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <ul>
                        {footerLeft.map((item) => (
                            <li key={item.id}>
                                <strong>{item.name}:</strong> {item.value}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-right">
                    <ul>
                        {footerRigth.map((item) => (
                            <li key={item.id}>
                                <Link to={item.path} className="footer-right-link">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-socials">
                <ul>
                    {socialPaths.map((social, index) => (
                        <li key={index}>
                            <a href={social.path}>{iconMap[social.name]}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Footer;