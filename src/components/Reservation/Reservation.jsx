import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import Menu from './Menu/Menu';

function Reservation(props) {

	return (
        <>
            <div onClick={props.disvisibleClick} className='reservation-background' style={{ display: props.visible ? "block" : "none"}}></div>
            <div className='reservation-container' style={{ transform: `translate(-50%, -50%) scale(${props.visible ? 1 : 0})` }}>
                <IoCloseSharp className='reservation-close-btn' onClick={props.disvisibleClick}/>
                <h3 className='reservation-title'>Запись на приём</h3>
                <div className="reservation-content">
                    <Menu/>
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