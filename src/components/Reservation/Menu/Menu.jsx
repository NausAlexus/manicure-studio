import './Menu.css';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import MasterSelect from '../MasterSelect/MasterSelect';
import DataTimeSelect from '../DataTimeSelect/DataTimeSelect';
import serviceData from '../../../config/reservation-config.json';

function Menu(props) {
    const mastersData = props.selectedService === 'маникюр' ? serviceData.manicure :
        props.selectedService === 'педикюр' ? serviceData.pedicure :
        props.selectedService === 'макияж' ? serviceData.makeup :
        props.selectedService === 'парикмахерские услуги' ? serviceData.hairdressers :
        props.selectedService === 'косметические услуги' ? serviceData.cosmetologists :
        props.selectedService === 'наращивание ресниц' ? serviceData.leshmaker : [];

    return (
        <div className='menu-container'>
            {props.currentComponent === 'serviceSelect' && (
                <ServiceSelect 
                    onServiceSelect={props.handleServiceSelect} 
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