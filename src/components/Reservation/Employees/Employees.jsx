import ReservationConfig from "../../../config/reservation-config.json";
import "./Employees.css";

const Employees = () => {
    const reservationConfig = ReservationConfig["employees"];

    const daysOfWeekInRussian = {
        monday: "Понедельник",
        tuesday: "Вторник",
        wednesday: "Среда",
        thursday: "Четверг",
        friday: "Пятница",
        saturday: "Суббота",
        sunday: "Воскресенье"
    };

    return (
        <>
            {reservationConfig.map((item) => (
                <div key={item.id} className="employees">
                    <div className="employees-title">
                        <div className="employees-name">{item.name}</div>
                        <div className="employees-role">
                            <div>{item.role}</div>
                            <div>⭐{item.rating}</div>
                        </div>
                    </div>

                    {/* Пробегаем по дням недели (ключам объекта) */}
                    {Object.keys(item.schedule).map((day) => (
                        <div key={day} className="employees-schedule">
                            <div className="schedule-day">
                                {daysOfWeekInRussian[day] || day} {/* Если день не найден в объекте, выводим оригинальный */}
                            </div>
                            {/* Пробегаем по времени для каждого дня */}
                            {item.schedule[day].map((time, index) => (
                                <span key={index} className="schedule-time">
                                    {time}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
export default Employees;
