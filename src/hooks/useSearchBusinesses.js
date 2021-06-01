import { useState, useEffect } from "react";
import { SearchRestaurants } from "../webapi/yelp"

const useSearchBusinesses = (foodType) => {

    const query = {
        limit: 10,
        location: "Berlin, Germany",
        term: "restaurants"
    };


    const [businesses, setBusinesses] = useState(null);

    const getRestaurantsByQuery = async () => {
        const businesses = await SearchRestaurants({ ...query, term: foodType });
        setBusinesses(businesses);
    };

    useEffect(() => {
        if (foodType) {
            getRestaurantsByQuery();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foodType]);
    return businesses;
}

export default useSearchBusinesses;