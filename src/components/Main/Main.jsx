import './Main.css';
import Home from './Home/Home';
import Services from './Services/Services';
import { Routes, Route } from 'react-router-dom';

function Main() {
	return (
		<>
			<Routes>
				<Route path="/" element = {<Home/>}/>
				<Route path="/services" element = {<Services/>}/>
			</Routes>
		</>
	);
};

export default Main;