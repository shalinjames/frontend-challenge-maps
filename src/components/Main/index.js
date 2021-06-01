import React from 'react';
import './Main.css';
import { BusinessListingProvider } from "../../contexts/BusinessListing";
import Map from '../Map';
import BusinessCards from "../BusinessCard/BusinessCards";
import FoodSelector from '../FoodSelector/FoodSelector';

const Main = () => {

	return (
		<main>
			<BusinessListingProvider>
				<Map />
				<FoodSelector />
				<BusinessCards />
			</BusinessListingProvider>

		</main>
	);
}

export default Main;
