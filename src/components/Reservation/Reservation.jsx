import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import MainMenu from './MainMenu/MainMenu';
import { useState } from 'react';
import Employees from './Employees/Employees';
import DateAndTime from './DateAndTime/DateAndTime';
import ServicesSelect from './ServicesSelect/ServicesSelect';

function Reservation(props) {
    const [selectedMenu, setSelectedMenu] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [chosenTimes, setChosenTimes] = useState([]); // Массив для выбранных времён
    const [btnNext, setBtnNext] = useState(false);
    
    const [currentStep, setCurrentStep] = useState(null);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        setCurrentStep(menu);
    };

    const handleTimeClick = (time, employeeId) => {
        setChosenTimes([...chosenTimes, { time, employeeId }]);
        setSelectedTime(time); 
        setSelectedEmployee(employeeId);
        setBtnNext(true); 
    };

    const handleNextStep = () => {
        if (currentStep === "employee") {
            setSelectedMenu("servicesSelect");
            setCurrentStep("servicesSelect");
        }else if (currentStep === "dateAndTime") {
            setSelectedMenu("servicesSelect");
            setCurrentStep("servicesSelect");
        }
    };

    return (
        <>
            <div onClick={props.disvisibleClick} className='reservation-background' style={{ display: props.visible ? "block" : "none" }}></div>
            <div className='reservation-container' style={{ transform: `translate(-50%, -50%) scale(${props.visible ? 1 : 0})` }}>
                <IoCloseSharp className='reservation-close-btn' onClick={props.disvisibleClick} />
                <h3 className='reservationTitle'>Запись на еблю</h3>
                <div className="reservation-content">
                    <MainMenu handleMenuClick={handleMenuClick} />
                    
                    
                    {selectedMenu === "employee" && (
                        <Employees selectedTime={selectedTime} selectedEmployee={selectedEmployee} handleTimeClick={handleTimeClick} />
                    )}

                    {selectedMenu === "dateAndTime" && <DateAndTime selectedTime={selectedTime} selectedEmployee={selectedEmployee} handleTimeClick={handleTimeClick} />}
                    
                    {selectedMenu === "servicesSelect" && <ServicesSelect />}
                    
                   
                    {btnNext && (currentStep === "employee" || currentStep === "dateAndTime") && (
                        <button className='btn-next' onClick={handleNextStep}>Далее</button>
                    )}
                </div>
            </div>
        </>
    );
}

Reservation.propTypes = {
    disvisibleClick: PropTypes.func.isRequired, // Функция для закрытия
    visible: PropTypes.bool.isRequired, // Булевое значение для видимости
};

export default Reservation;
