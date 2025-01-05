import React, { useState } from 'react';
import './Menu.css';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import MasterSelect from '../MasterSelect/MasterSelect';
import DataTimeSelect from '../DataTimeSelect/DataTimeSelect';
import serviceData from '../../../config/reservation-config.json';

function Menu(props) {
    const [selectedService, setSelectedService] = useState('');
    const [selectedMaster, setSelectedMaster] = useState(null); // Добавляем состояние для выбранного мастера

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setSelectedMaster(null); // Сбрасываем выбранного мастера при смене услуги
        props.handleServiceSelect(service);
    };

    const handleMasterSelect = (master) => {
        setSelectedMaster(master); // Сохраняем выбранного мастера
        props.handleMasterSelect(master); // Передаем мастера в родительский компонент
    };

    const mastersData = selectedService === 'маникюр' ? serviceData.manicure :
        selectedService === 'педикюр' ? serviceData.pedicure :
        selectedService === 'макияж' ? serviceData.makeup :
        selectedService === 'парикмахерские услуги' ? serviceData.hairdressers :
        selectedService === 'косметические услуги' ? serviceData.cosmetologists :
        selectedService === 'наращивание ресниц' ? serviceData.leshmaker : [];

    return (
        <div className='menu-container'>
            {props.currentComponent === 'serviceSelect' && (
                <ServiceSelect 
                    onServiceSelect={handleServiceSelect}
                    selectedService={selectedService}
                />
            )}
            {props.currentComponent === 'masterSelect' && (
                <MasterSelect 
                    mastersData={mastersData} 
                    onMasterSelect={handleMasterSelect} 
                    selectedMaster={selectedMaster} // Передаем информацию о выбранном мастере
                />
            )}
            {props.currentComponent === 'dataTimeSelect' && (
                <DataTimeSelect 
                    userData={props.userData} 
                    disvisibleClick={props.disvisibleClick} 
                    handleDateChange={props.handleDateChange}
                    handleTimeChange={props.handleTimeChange}
                    handleNameChange={props.handleNameChange}
                    handlePhoneChange={props.handlePhoneChange}
                    handleSubmit={props.handleSubmit}
                />
            )}
        </div>
    );
}

export default Menu;