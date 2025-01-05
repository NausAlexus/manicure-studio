import React, { useState } from 'react';
import './Menu.css';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import MasterSelect from '../MasterSelect/MasterSelect';
import DataTimeSelect from '../DataTimeSelect/DataTimeSelect';
import serviceData from '../../../config/reservation-config.json';

function Menu(props) {
    const [selectedService, setSelectedService] = useState('');

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        props.handleServiceSelect(service);
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
                    onServiceSelect={handleServiceSelect}  // Обновлено
                    selectedService={selectedService}       // Передаем состояние
                />
            )}
            {props.currentComponent === 'masterSelect' && (
                <MasterSelect 
                    mastersData={mastersData} 
                    onMasterSelect={props.handleMasterSelect} 
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