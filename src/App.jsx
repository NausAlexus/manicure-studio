import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Reservation from './components/Reservation/Reservation';

function App() {
    const [userData, setUserData] = useState({
		name:'',
		phone:'',
        service: '',
        master: '',
        date: '',
        time: ''
    });

    const [formMessage, setFormMessage] = useState(''); // Добавляем состояние для сообщения формы

    console.log(userData);

    const [isVisibleReservation, setIsVisibleReservation] = useState(false);

    const handleClickVisible = () => {
        setIsVisibleReservation(true);
    }
    const handleClickDisvisible = () => {
        setIsVisibleReservation(false);
    }
    const handleServiceSelect = (serviceTitle) => {
        setUserData((prev) => ({
            ...prev,
            service: serviceTitle,
        }));
    };
    const handleMasterSelect = (selectedMaster) => {
        setUserData((prev) => ({
            ...prev,
            master: selectedMaster,
        }));
    };
    const handleDateChange = (date) => {
        setUserData((prev) => ({
            ...prev,
            date: date
        }));
    };
    const handleTimeChange = (time) => {
        setUserData((prev) => ({
            ...prev,
            time: time
        }));
    };
	const handleNameChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
	const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/send-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setFormMessage('Заявка успешно отправлена'); // Устанавливаем сообщение об успехе
            } else {
                throw new Error(data.error || 'Неизвестная ошибка');
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            setFormMessage('Не удалось отправить заявку.'); // Устанавливаем сообщение об ошибке
        });
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
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handlePhoneChange={handlePhoneChange}
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