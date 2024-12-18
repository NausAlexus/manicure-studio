import "./Contacts.css";
import ContactsConfig from "./../../../config/contacts-config.json";

const Contacts = () => {
    const contactsConfig = ContactsConfig["contacts"];
    return (
        <>
            <div className="contacts">
                <div className="contacts-title">Контакты</div>
                <div className="contacts-container">
                    <div className="contacts-container-left">
                        <div className="contacts-container-left-content">
                            {contactsConfig.map((item) => (
                                <div
                                    key={item.title}
                                    className="contacts-container-left-content-block"
                                >
                                    <div className="contacts-container-left-content-title">
                                        {item.title}
                                    </div>
                                    <div className="contacts-container-left-content-text">
                                        {item.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contacts-container-rigth">
                        <a target="_blank" href="https://www.google.ru/maps/place/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA,+%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/@53.8923173,27.5001467,12z/data=!4m6!3m5!1s0x46dbcfd35b1e6ad3:0xb61b853ddb570d9!8m2!3d53.9006011!4d27.558972!16zL20vMGRseGo?hl=ru&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"><img src="https://i.ibb.co/BGMvrFX/Screenshot-1.webp" alt="Map" /></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
