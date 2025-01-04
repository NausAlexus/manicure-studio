import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Reservation from './components/Reservation/Reservation';

function App() {

    const [userData, setUserData] = useState({
        service: '',
        master: '',
		date: '',
		time: ''
    });

	console.log(userData);

	const[isVisibleReservation, setIsVisibleReservation] = useState(false);
	
	const handleClickVisible = () => {
		setIsVisibleReservation(true);
	}
	const handleClickDisvisible = () => {
		setIsVisibleReservation(false);
	}


	const handleServiceSelect = (serviceTitle) => {
        setUserData((prev) => ({
            ...prev,
            service: serviceTitle, // Обновляем выбранную услугу
        }));
    };
	const handleMasterSelect = (selectedMaster) => {
        setUserData((prev) => ({
            ...prev,
            master: selectedMaster, // Обновляем выбранного мастера
        }));
    };
    // Добавляем метод для обновления даты
    const handleDateChange = (date) => {
        setUserData((prev) => ({
            ...prev,
            date: date // Обновляем дату
        }));
    };
	// Функция для обновления времени
    const handleTimeChange = (time) => {
        setUserData((prev) => ({
            ...prev,
            time: time // Обновляем время
        }));
    };


	return (
		<>
			<Reservation 
				visible={isVisibleReservation}
				disvisibleClick={handleClickDisvisible}
				handleServiceSelect={handleServiceSelect}
				handleMasterSelect={handleMasterSelect}
				handleDateChange={handleDateChange}
				handleTimeChange={handleTimeChange}
				userData={userData}
			/>
			<Header visibleClick={handleClickVisible}/>
			<Main 
				visibleClick={handleClickVisible}
			/>
			<Footer />
		</>
	);
};

export default App;