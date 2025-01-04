import './Menu.css';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import MasterSelect from '../MasterSelect/MasterSelect';
import DataTimeSelect from '../DataTimeSelect/DataTimeSelect';
import { useState } from 'react';
import serviceData from '../../../config/reservation-config.json';

function Menu(props) {
    const serviceManicureData = serviceData.manicure;
    const servicePedicureData = serviceData.pedicure;
    const serviceMakeupData = serviceData.makeup;
    const serviceHairdressersData = serviceData.hairdressers;
    const serviceCosmetologistsData = serviceData.cosmetologists;
    const serviceLeshmakerData = serviceData.leshmaker;

    const [selectedService, setSelectedService] = useState(null);
    const [selectedMaster, setSelectedMaster] = useState(null); // Состояние для хранения выбранного мастера

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setSelectedMaster(null); // Сброс выбранного мастера при выборе службы
        // Вызов функции из props
        props.handleServiceSelect(service);
    };

    const handleMasterSelect = (master) => {
        setSelectedMaster(master); // Установка выбранного мастера
        // Вызов функции из props
        props.handleMasterSelect(master.name);
    };

    const mastersData = selectedService === 'маникюр' ? serviceManicureData :
        selectedService === 'педикюр' ? servicePedicureData :
        selectedService === 'макияж' ? serviceMakeupData :
        selectedService === 'парикмахерские услуги' ? serviceHairdressersData :
        selectedService === 'косметические услуги' ? serviceCosmetologistsData :
        selectedService === 'наращивание ресниц' ? serviceLeshmakerData : [];

    return (
        <div className='menu-container'>
            {selectedMaster === null ? (
                selectedService === null ? (
                    <ServiceSelect 
                        onServiceSelect={handleServiceSelect} 
                    />
                ) : (
                    <MasterSelect 
                        mastersData={mastersData} 
                        onMasterSelect={handleMasterSelect} 
                    />
                )
            ) : (
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