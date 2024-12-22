import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import MainMenu from './MainMenu/MainMenu';
import { useState } from 'react';
import Employees from './Employees/Employees';
import DateAndTime from './DateAndTime/DateAndTime';
import ServicesSelect from './ServicesSelect/ServicesSelect';
import ReservationConfig from "./../../config/reservation-config.json";


function Reservation(props) {
    const [selectedMenu, setSelectedMenu] = useState("employee"); 
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [chosenTimes, setChosenTimes] = useState([]); // Массив для выбранных времён
    const [btnNext, setBtnNext] = useState(false);
    
    const [currentStep, setCurrentStep] = useState(null);
    const employeesData = ReservationConfig["employees"]; // Данные сотрудников


    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        setCurrentStep(menu);
    };

    const handleTimeClick = (time, employeeId, service) => {
        // Найдем имя сотрудника по его ID
        const employee = employeesData.find(emp => emp.id === employeeId); // employeesData - это массив сотрудников
    
        // Очищаем массив и добавляем только нового сотрудника с выбранным временем и его именем
        const updatedChosenTimes = [{ time, employeeId, employeeName: employee?.name}]; // Добавляем имя сотрудника
        
        setChosenTimes(updatedChosenTimes); // Обновляем массив выбранных данных
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
                <h3 className='reservationTitle'>Записаться на приём</h3>
                <div className="click-service">
    <h4>Выбранное:</h4>
    <ul>
        {chosenTimes.length > 0 ? (
            chosenTimes.map((item, index) => (
                <li key={index}>
                    <strong>Время:</strong> {item.time} <br />
                    <strong>Сотрудник:</strong> {item.employeeName} <br />
                    <strong>Услуга:</strong> {item.service} {/* Теперь выводим услугу */}
                </li>
            ))
        ) : (
            <li>Нет выбранных данных</li>
        )}
    </ul>
</div>

                <div className="reservation-content">
                    <MainMenu handleMenuClick={handleMenuClick} />
                    
                    
                    {selectedMenu === "employee" && (
                        <Employees selectedTime={selectedTime} selectedEmployee={selectedEmployee} handleTimeClick={handleTimeClick} />
                    )}

                    {selectedMenu === "dateAndTime" && <DateAndTime selectedTime={selectedTime} selectedEmployee={selectedEmployee} handleTimeClick={handleTimeClick} />}
                    
                    {selectedMenu === "servicesSelect" && <ServicesSelect chosenTimes={chosenTimes} setChosenTimes={setChosenTimes} />}
                    
                   
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
