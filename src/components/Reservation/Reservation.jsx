import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import MainMenu from './MainMenu/MainMenu';
import { useState } from 'react';
import Employees from './Employees/Employees';
import DateAndTime from './DateAndTime/DateAndTime';

function Reservation(props) {
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu); // Меняем выбранное меню
    };
	return (
        <>
            <div onClick={props.disvisibleClick} className='reservation-background' style={{ display: props.visible ? "block" : "none"}}></div>
            <div className='reservation-container' style={{ transform: `translate(-50%, -50%) scale(${props.visible ? 1 : 0})` }}>
                <IoCloseSharp className='reservation-close-btn' onClick={props.disvisibleClick}/>
                <h3 >Запись на приём</h3>
                <div className="reservation-content">
                <MainMenu handleMenuClick={handleMenuClick} />
                {selectedMenu === "employee" ? <Employees /> : null}
                {selectedMenu === "dateAndTime" ? <DateAndTime /> : null}
                </div>
            </div>
        </>
	);
};
Reservation.propTypes = {
    disvisibleClick: PropTypes.func.isRequired, // Функция для закрытия
    visible: PropTypes.bool.isRequired, // Булевое значение для видимости
};

export default Reservation;