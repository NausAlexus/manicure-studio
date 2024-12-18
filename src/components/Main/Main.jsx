import React, { lazy } from 'react';
   const Home = lazy(() => import('./Home/Home'));
   const Services = lazy(() => import('./Services/Services'));
   const GiftSertificat = lazy(() => import('./GiftCertificat/GiftCertificat'));
   const Item = lazy(() => import('./Item/Item'));
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop';
import Contacts from './Contacts/Contacts';
import ItemConfig from "../../config/item-config.json";

function Main(props) {

	// Данные
	const ItemData = ItemConfig.item;

	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/" element = {<Home visibleClick={props.visibleClick}/>}/>
				<Route path="/services" element = {<Services/>}/>
				<Route path="/setificat" element = {<GiftSertificat/>}/>
				<Route path="/contacts" element = {<Contacts/>} />
                {ItemData.map((item) => (
                    <Route 
                        key={item.id} 
                        path={item.path} 
                        element={<Item 
                            titleItem={item.title}
                            descriptionItem={item.description}
                            serviceItem={item.services}
                            visibleClick={props.visibleClick}
                        />} 
                    />
                ))}
			</Routes>
		</>
	);
}

export default Main;