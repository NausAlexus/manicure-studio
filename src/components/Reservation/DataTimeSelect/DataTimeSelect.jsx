import './DataTimeSelect.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DataTimeConfig from '../../../config/reservation-config.json'

export default function DataTimeSelect(props) {

    // Получение текущей даты
    const today = new Date();

    // Установка минимальной и максимальной дат
    const minDate = today; // Минимальная дата - сегодня
    const maxDate = new Date(today); // Максимальная дата
    maxDate.setDate(today.getDate() + 30); // Добавление 30 дней к текущей дате

    return (

        <div className='data-time-select-container'>
            <h3 className='data-time-select-title'>Выбор даты и времени:</h3>
            <div className='data-time-select-content'>
                <Calendar
                    minDate={minDate}
                    maxDate={maxDate}
                />
                <div className='data-time-select-schedule'>
                    
                </div>
            </div>
        </div>
        
    );
};