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
		window.location.reload();
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





	return (
		<>
			<Reservation 
				visible={isVisibleReservation}
				disvisibleClick={handleClickDisvisible}
				handleServiceSelect={handleServiceSelect}
				handleMasterSelect={handleMasterSelect}
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