import "./DateAndTime.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReservationConfig from "../../../config/reservation-config.json";
import { useState } from "react";

// Массив дней недели для соответствия числам
const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const DateAndTime = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]); // Доступные времена для всех сотрудников
    const [selectedTime, setSelectedTime] = useState(null); // Выбранное время
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Выбранный сотрудник

    const employeesData = ReservationConfig["employees"]; // Данные сотрудников
    const currentDate = new Date(); // Текущая дата

    // Функция для проверки, если время уже прошло
    const isPastTime = (time) => {
        const now = new Date();
        const [hours, minutes] = time.split(":").map(Number); // Разделяем время по часам и минутам
        const selectedTime = new Date(now);
        selectedTime.setHours(hours, minutes, 0, 0);

        return selectedTime < now; // Если время меньше текущего времени, оно прошло
    };

    // Обработчик изменения даты
    const onDateChange = (date) => {
        setSelectedDate(date);

        const dayOfWeek = daysOfWeek[date.getDay()]; // Получаем день недели из выбранной даты

        const times = employeesData.map((employee) => {
            const scheduleForDay = employee.schedule[dayOfWeek] || []; // Доступное время для выбранного дня

            // Убираем прошедшие времена, если выбран текущий день
            if (date.toDateString() === currentDate.toDateString()) {
                const filteredTimes = scheduleForDay.filter(time => !isPastTime(time));
                return {
                    id: employee.id,
                    name: employee.name,
                    availableTimes: filteredTimes,
                };
            }

            return {
                id: employee.id,
                name: employee.name,
                availableTimes: scheduleForDay,
            };
        }).filter(employee => employee.availableTimes.length > 0); // Убираем сотрудников без доступных времён

        setAvailableTimes(times); // Перезаписываем доступные времена
    };

    // Обработчик клика по времени
    const handleTimeClick = (time, employeeId) => {
        // Обновляем состояние выбранного времени и сотрудника
        setSelectedTime(time);
        setSelectedEmployee(employeeId);

        // Передаем выбранное время и сотрудника в родительский компонент
        props.handleTimeClick(time, employeeId);
    };

    return (
        <>
            <h2 className="reservation-title">Выберите дату</h2>
            <div className="calendar-time">
                {/* Устанавливаем minDate, чтобы нельзя было выбрать прошедшие даты */}
                <div>
                    <Calendar onChange={onDateChange} value={selectedDate} minDate={currentDate} />
                </div>
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
                                            className={`schedule-time ${
                                                selectedTime === time && selectedEmployee === employee.id
                                                    ? "selected"
                                                    : ""
                                            }`} // Добавляем класс 'selected' если время и сотрудник совпадают
                                            onClick={() => handleTimeClick(time, employee.id)}
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
