import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";

function Reservation(props) {
	return (
        <>
            <div onClick={props.disvisibleClick} className='reservation-background' style={{ display: props.visible ? "block" : "none"}}></div>
            <div className='reservation-container' style={{ transform: `translate(-50%, -50%) scale(${props.visible ? 1 : 0})` }}>
                <IoCloseSharp className='reservation-close-btn' onClick={props.disvisibleClick}/>
                <h3>Запись на приём</h3>
            </div>
        </>
	);
};

export default Reservation;