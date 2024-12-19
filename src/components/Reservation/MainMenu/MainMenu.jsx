import { FaUserFriends, FaCalendarAlt, FaList } from "react-icons/fa";
import "./MainMenu.css";

function MainMenu(props) {
    return (
        <>
            <ul className="main-menu">
                <li onClick={() => props.handleMenuClick("employee")}>
                    <FaUserFriends />
                    Выбор сотрудника
                </li>
                <li onClick={() => props.handleMenuClick("dateAndTime")}>
                    <FaCalendarAlt />
                    Выбрать дату и время
                </li>
                <li onClick={() => props.handleMenuClick("servicesSelect")}>
                    <FaList />
                    Выбрать услуги
                </li>
            </ul>
        </>
    );
}

export default MainMenu;
