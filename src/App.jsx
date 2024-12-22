import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Reservation from './components/Reservation/Reservation';

function App() {

	const[isVisibleReservation, setIsVisibleReservation] = useState(false);
	
	const handleClickVisible = () => {
		setIsVisibleReservation(true);
	}
	const handleClickDisvisible = () => {
		setIsVisibleReservation(false);
	}

	// Данные о пользователе
	const[userData, setUserData] = useState({
        name: 'Хуй',
        phone: 'Хуй',
        comment: 'Хуй',
    });

	// Работа с сервером
	const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/send-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Данные успешно отправлены в Telegram');
                setFormMessage('Ваша заявка принята!');
                setIsFormSubmitted(true);

                setTimeout(() => {
                    closeForm();
                    window.location.reload();
                }, 3000)

            } else {
                console.error('Ошибка при отправке данных:', data.error);
                setFormMessage('Ошибка при отправке данных. Пожалуйста, попробуйте снова.');

                setTimeout(() => {
                    closeForm();
                    window.location.reload();
                }, 3000)

            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            setFormMessage('Произошла ошибка. Пожалуйста, повторите попытку позже.');
        });
    };

	return (
		<>
			<Reservation 
				visible={isVisibleReservation}
				disvisibleClick={handleClickDisvisible}
			/>
			<Header visibleClick={handleClickVisible}
					handleSubmit={handleSubmit}/>
			<Main 
				visibleClick={handleClickVisible}
			/>
			<Footer />
		</>
	);
};

export default App;