import "./Contacts.css";
import imgMap from "./../../../../public/Screenshot_1.png";
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
                                    key={item}
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
                        <img src={imgMap} alt="Map" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
