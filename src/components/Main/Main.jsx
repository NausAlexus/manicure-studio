import React, { Suspense, lazy } from 'react';
   const Home = lazy(() => import('./Home/Home'));
   const Services = lazy(() => import('./Services/Services'));
   const GiftSertificat = lazy(() => import('./GiftCertificat/GiftCertificat'));
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop';
import Contacts from './Contacts/Contacts';

function Main() {
	return (
		<>
			<ScrollToTop />
			<Routes>


				<Route path="/" element = {<Home/>}/>
				<Route path="/services" element = {<Services/>}/>
				<Route path="/setificat" element = {<GiftSertificat/>}/>
				<Route path="/contacts" element = {<Contacts/>} />

			</Routes>
		</>
	);
}

export default Main;