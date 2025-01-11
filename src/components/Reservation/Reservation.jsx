import './Reservation.css';
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineAddLink } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { HiMiniCalendar } from "react-icons/hi2";
import PropTypes from 'prop-types';
import Menu from './Menu/Menu';
import { useState } from 'react'; // Импортируем useState

function Reservation(props) {
    const [selectedService, setSelectedService] = useState(null); // Состояние для хранения выбранного сервиса
    const [selectedMaster, setSelectedMaster] = useState(null); // Состояние для хранения выбранного мастера
    const [currentComponent, setCurrentComponent] = useState('serviceSelect'); // Новый статус для текущего компонента

    const handleClose = () => {
        props.disvisibleClick(); // Закрывает модальное окно
        setSelectedService(null); // Сбрасываем выбранный сервис
        setSelectedMaster(null); // Сбрасываем выбранного мастера
        setCurrentComponent('serviceSelect'); // Сбрасываем текущий компонент на ServiceSelect при закрытии
    };

    const switchComponent = (component) => {
        setCurrentComponent(component); // Меняем текущий компонент
    };

    // Обработка выбора сервиса
    const handleServiceSelect = (service) => {
        setSelectedService(service);
        props.handleServiceSelect(service);
        setCurrentComponent('masterSelect'); // Переходим к выбору мастера
    };

    // Обработка выбора мастера
    const handleMasterSelect = (master) => {
        setSelectedMaster(master);
        props.handleMasterSelect(master.name);
        setCurrentComponent('dataTimeSelect'); // Переходим к выбору даты и времени
    };

    return (
        <>
            <div onClick={props.disvisibleClick} className='reservation-background' style={{ display: props.visible ? "block" : "none"}}></div>
            <div className='reservation-container' style={{ transform: `translate(-50%, -50%) scale(${props.visible ? 1 : 0})` }}>
                <div className='reservation-menu-block'>
                    <div className='menu-block-btn'>
                        <MdOutlineAddLink className='reservation-menu-block-btn' onClick={() => switchComponent('serviceSelect')} />
                        <IoMdPeople className='reservation-menu-block-btn' onClick={() => switchComponent('masterSelect')} />
                        <HiMiniCalendar className='reservation-menu-block-btn' onClick={() => switchComponent('dataTimeSelect')} />
                    </div>
                    <IoCloseSharp className='reservation-close-btn' onClick={handleClose} />
                </div>
                <h3 className='reservation-title'>Запись на приём</h3>
                <div className="reservation-content">
                    <Menu 
                        handleServiceSelect={handleServiceSelect}
                        handleMasterSelect={handleMasterSelect}
                        disvisibleClick={props.disvisibleClick}
                        handleDateChange={props.handleDateChange}
                        handleTimeChange={props.handleTimeChange}
                        handleSubmit={props.handleSubmit}
                        handleNameChange={props.handleNameChange}
                        handlePhoneChange={props.handlePhoneChange}
                        userData={props.userData}
                        selectedService={selectedService} // Передаем выбранный сервис
                        selectedMaster={selectedMaster} // Передаем выбранного мастера
                        currentComponent={currentComponent} // Передаем текущий компонент
                        handleClose={handleClose}
                        handleClickVisiblePopUp={props.handleClickVisiblePopUp}
                    />
                </div>
            </div>
        </>
    );
};

Reservation.propTypes = {
    disvisibleClick: PropTypes.func.isRequired, // Функция для закрытия
    visible: PropTypes.bool.isRequired, // Булевое значение для видимости
    handleServiceSelect: PropTypes.func.isRequired,
    handleMasterSelect: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func,
    handleTimeChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleNameChange: PropTypes.func,
    handlePhoneChange: PropTypes.func,
    userData: PropTypes.object,
};

export default Reservation;