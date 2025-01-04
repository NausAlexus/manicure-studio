import './DataTimeSelect.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react';
import DataTimeConfig from '../../../config/reservation-config.json';

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Маппинг для сопоставления строк услуги
const serviceMapping = {
    'маникюр': 'manicure',
    'педикюр': 'pedicure',
    'макияж': 'makeup',
    'парикмахерские услуги': 'hairdressers',
    'косметические услуги': 'cosmetologists',
    'наращивание ресниц': 'leshmaker'
};

export default function DataTimeSelect(props) {
    const today = new Date();
    const minDate = today;
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    const [selectedDate, setSelectedDate] = useState(today);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const { service, master } = props.userData;

        // Если сопоставленная услуга и мастер выбраны, обновляем доступное время
        if (service && master) {
            const mappedService = serviceMapping[service.toLowerCase()];
            const selectedMaster = findMaster(mappedService, master);

            if (selectedMaster) {
                const dayOfWeek = daysOfWeek[selectedDate.getDay()];
                const times = selectedMaster.schedule[dayOfWeek] || [];

                if (times.length > 0) {
                    setAvailableTimes([...new Set(times)]);
                    setMessage('');
                } else {
                    setAvailableTimes([]);
                    setMessage('На эту дату записи нет.');
                }
            }
        }
    }, [props.userData, selectedDate]);

    const findMaster = (service, masterName) => {
        const masters = DataTimeConfig[service];
        if (!masters) return null;

        // Находим мастера по имени
        return masters.find(master => master.name === masterName);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        props.handleDateChange(formattedDate); // Передаем отформатированную дату родительскому компоненту
    };
    const handleTimeClick = (time) => {
        props.handleTimeChange(time); // Передаем выбранное время в родительский компонент
    };

    return (
        <div className='data-time-select-container'>
            <h3 className='data-time-select-title'>Выбор даты и времени:</h3>
            <div className='data-time-select-content'>
                <Calendar
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                    value={selectedDate}
                />
                <div className='data-time-select-schedule'>
                    {availableTimes.length > 0 ? (
                        <div>
                            <ul className='data-time-select-schedule-items'>
                                {availableTimes.map((time, index) => (
                                    <li className='data-time-select-schedule-item' key={index} onClick={() => handleTimeClick(time)}>
                                        {time}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>{message}</p>
                    )}
                </div>
            </div>
        </div>
    );
}