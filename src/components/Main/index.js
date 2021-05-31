import React from 'react';

import './Main.css';

import { SearchRestaurants } from '../../webapi/yelp'
import Map from '../Map/Map';
import BusinessCard from "../BusinessCard/BusinessCard";


class Main extends React.Component {
	state = {
		businesses: []
	}

	componentDidMount() {
		this.fetchRestaurants()
			.then(res => this.setState({ businesses: res || [] }))
			.catch(err => console.log(err));
	}

	fetchRestaurants = async () => {
		const query = {
			limit: 50,
			location: "Berlin, Germany",
			term: "restaurants"
		}
		const urlParams = new URLSearchParams(query);
		return SearchRestaurants(urlParams)
	}

	render() {
		return (
			<main>
				<Map />
				{this.state.businesses.map(business => <BusinessCard business={business} />)}
			</main>
		);
	}
}

export default Main;
