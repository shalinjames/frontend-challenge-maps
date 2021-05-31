import React from 'react';

import './Main.css';

import { SearchRestaurants } from '../../webapi/yelp'
import Map from '../Map/Map';


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
				{this.state.businesses.map(business => {
					return (
						<div className="card" key={business.id}>
							<img src={business.image_url} alt={business.name} />
							<div className="container">
								<h4><a href={business.url}>{business.name}</a></h4>
								{
									business.location &&
									business.location.display_address &&
									(
										<p>
											{business.location.display_address[0]}
											<br />
											{business.location.display_address[1]}
										</p>
									)
								}
								<p>{business.display_phone}</p>
							</div>
						</div>
					)
				})}
			</main>
		);
	}
}

export default Main;
