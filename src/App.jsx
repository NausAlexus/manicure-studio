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

	return (
		<>
			<Reservation 
				visible={isVisibleReservation}
				disvisibleClick={handleClickDisvisible}
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