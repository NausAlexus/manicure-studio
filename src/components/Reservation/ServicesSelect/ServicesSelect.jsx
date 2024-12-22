import "./ServicesSelect.css";
import ServicesConfig from "../../../config/services-config.json";
import { useState, useEffect } from "react";

const ServicesSelect = ({ chosenTimes, setChosenTimes }) => {
    const [selectedService, setSelectedService] = useState(null); // Состояние для выбранной услуги

    const ServicesSelect = ServicesConfig["services-items"];

    useEffect(() => {
        // Логирование массива каждый раз, когда он обновляется
        console.log("Обновленный массив выбранных данных:", chosenTimes);
    }, [chosenTimes]); // Этот хук сработает при каждом изменении chosenTimes

    const handleServiceClick = (service) => {
        setSelectedService(service); // Устанавливаем выбранную услугу
    
        // Обновляем массив chosenTimes, добавляя выбранную услугу
        const updatedChosenTimes = chosenTimes.map((item) => {
            return { ...item, service: service.title }; // Обновляем объект в массиве, добавляя услугу
        });
    
        setChosenTimes(updatedChosenTimes); // Обновляем состояние chosenTimes
    };

    const handleFinishClick = () => {
        // Выводим в консоль массив с выбранным временем, сотрудниками и услугами
        console.log("Выбранные данные:", chosenTimes);
    };

    return (
        <>
            <h3 className="reservation-title">Выбор услуги:</h3>
            {ServicesSelect.map((item) => (
                <div
                    key={item.title}
                    className={`ServicesSelect ${selectedService?.title === item.title ? "selected" : ""}`} // Добавляем класс 'selected', если услуга выбрана
                    onClick={() => handleServiceClick(item)} // Обработчик выбора услуги
                >
                    <ul>
                        <li>{item.title}</li>
                    </ul>
                </div>
            ))}
            <button onClick={handleFinishClick}>Финиш</button>
        </>
    );
}

export default ServicesSelect;
