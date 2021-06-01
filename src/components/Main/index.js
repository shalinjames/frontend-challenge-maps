import React from 'react';

import './Main.css';

import { SearchRestaurants } from '../../webapi/yelp'
import Map from '../Map';
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
		return SearchRestaurants(query)
	}

	render() {
		return (
			<main>
				<Map businesses={this.state.businesses} />

				<div include="form-input-select()">
					<select value="2">
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
						<option value="5">Option 5</option>
					</select>
				</div>

				{this.state.businesses.map(business => <BusinessCard key={business.id} business={business} />)}
			</main>
		);
	}
}

export default Main;
