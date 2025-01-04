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
    const [selectedTime, setSelectedTime] = useState(null); // Состояние для выбранного времени
    const [showCalendar, setShowCalendar] = useState(true); // Состояние для отображения календаря
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
        setSelectedTime(time); // Сохраняем выбранное время
        props.handleTimeChange(time); // Передаем выбранное время в родительский компонент
        setShowCalendar(false); // Скрываем календарь и время
    };

    const handleSubmitRequest = () => {
        // Логика для отправки заявки
        alert('Заявка отправлена!');
    };

    return (
        <div className='data-time-select-container'>
            {showCalendar && (
                <h3 className='data-time-select-title'>Выбор даты и времени:</h3>
            )}
            <div className='data-time-select-content'>
                {showCalendar && (
                    <Calendar
                        className='data-time-select-calendar'
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                )}
                <div className='data-time-select-schedule'>
                    {selectedTime ? ( // Если выбрано время, показываем кнопку
                        <button className='submit-request-button'>
                            Отправить заявку
                        </button>
                    ) : (
                        availableTimes.length > 0 ? (
                            <div>
                                <ul className='data-time-select-schedule-items'>
                                    {availableTimes.map((time, index) => (
                                        <li 
                                            className='data-time-select-schedule-item' 
                                            key={index} 
                                            onClick={() => handleTimeClick(time)}
                                        >
                                            {time}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className='data-time-select-schedule-message'>{message}</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}