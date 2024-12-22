import "./DateAndTime.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationConfig from "../../../config/reservation-config.json";
import { useState } from "react";

// Массив дней недели для соответствия числам
const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const DateAndTime = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Состояние для выбранного сотрудника

    const employeesData = ReservationConfig["employees"]; // Данные сотрудников

    const onDateChange = (date) => {
        setSelectedDate(date);

        // Получаем день недели из выбранной даты
        const dayOfWeek = daysOfWeek[date.getDay()]; // getDay() возвращает число от 0 (воскресенье) до 6 (суббота)

        // Фильтруем сотрудников, которые работают в этот день
        const times = employeesData.map((employee) => {
            const scheduleForDay = employee.schedule[dayOfWeek] || []; // Доступное время в выбранный день
            return {
                id: employee.id, // Добавляем id сотрудника для дальнейшей идентификации
                name: employee.name,
                availableTimes: scheduleForDay,
            };
        }).filter(employee => employee.availableTimes.length > 0); // Убираем сотрудников без времени

        setAvailableTimes(times);
    };

    // Обработчик клика по времени
    const handleTimeClick = (time, employeeId) => {
        // Проверяем, если это время уже выбрано у другого сотрудника
        if (selectedEmployee && props.selectedTime === time) {
            // Если время уже выбрано, ничего не делаем
            return;
        }

        setSelectedEmployee(employeeId); // Устанавливаем выбранного сотрудника
        props.handleTimeClick(time, employeeId); // Передаем время и сотрудника в родительский компонент
    };

    return (
        <>
            <h2 className="reservation-title">Выберите дату</h2>
            <div className="calendar-time">
                <div><Calendar onChange={onDateChange} value={selectedDate} /></div>     
                {selectedDate && (
                    <div className="time-selection">
                        <h3>Доступное время:</h3>
                        {availableTimes.map((employee) => (
                            <div key={employee.id} className="employee-time-block">
                                <h4>{employee.name}</h4>
                                <ul>
                                    {employee.availableTimes.map((time) => (
                                        <li
                                            key={time}
                                            className={`schedule-time ${props.selectedTime === time && selectedEmployee === employee.id ? "selected" : ""}`}
                                            onClick={() => handleTimeClick(time, employee.id)} // Устанавливаем id сотрудника при клике
                                        >
                                            {time}
                                        </li>
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
