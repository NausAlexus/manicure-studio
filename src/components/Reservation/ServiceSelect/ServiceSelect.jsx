import './ServiceSelect.css';
import serviceData from '../../../config/services-config.json'

function ServiceSelect(props) {

    const serviceDataTitle = serviceData['services-items'];

    return (
        <div className='service-select-container'>
            <h3 className='service-select-title'>Выбор услуги:</h3>
            <ul className='service-select-items'>
                {serviceDataTitle.map(service => (
                    <li onClick={props.handleShowService} className='service-select-item' key={service.title}>{service.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceSelect;