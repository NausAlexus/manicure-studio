import "./DateAndTime.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationConfig from "../../../config/reservation-config.json";
import { useState } from "react";

// Массив дней недели для соответствия числам
const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const DateAndTime = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    const employeesData = ReservationConfig["employees"]; // Данные сотрудников

    const onDateChange = (date) => {
        setSelectedDate(date);

        // Получаем день недели из выбранной даты
        const dayOfWeek = daysOfWeek[date.getDay()]; // getDay() возвращает число от 0 (воскресенье) до 6 (суббота)

        // Фильтруем сотрудников, которые работают в этот день
        const times = employeesData.map((employee) => {
            const scheduleForDay = employee.schedule[dayOfWeek] || []; // Доступное время в выбранный день
            return {
                name: employee.name,
                availableTimes: scheduleForDay,
            };
        }).filter(employee => employee.availableTimes.length > 0); // Убираем сотрудников без времени

        setAvailableTimes(times);
    };

    return (
        <>
            <h2>Выберите дату</h2>
            <div className="calendar-time">
                <div><Calendar onChange={onDateChange} value={selectedDate} /></div>     
                {selectedDate && (
                    <div className="time-selection">
                        <h3>Доступное время:</h3>
                        {availableTimes.map((employee) => (
                            <div key={employee.name} className="employee-time-block">
                                <h4>{employee.name}</h4>
                                <ul>
                                    {employee.availableTimes.map((time) => (
                                        <li key={time}>{time}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default DateAndTime;
