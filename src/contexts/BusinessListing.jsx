import React, { useEffect, useState, useCallback } from "react";
import { SearchRestaurants } from "../webapi/yelp"

export const BusinessListingContext = React.createContext({
    businesses: [],
    actions: {},
    foods: []
});

const query = {
    limit: 10,
    location: "Berlin, Germany",
    term: "restaurants"
};



export const BusinessListingProvider = ({ children }) => {

    const [businesses, setBusinesses] = useState([]);
    const [foodType, setFoodType] = useState("Sushi");
    const actions = { setFoodType };

    const getRestaurantsByQuery = useCallback(async () => {
        const businesses = await SearchRestaurants({ ...query, term: foodType });
        setBusinesses(businesses);
    }, [foodType]);

    useEffect(() => {
        if (foodType) {
            getRestaurantsByQuery();
        }
    }, [getRestaurantsByQuery, foodType]);


    return <BusinessListingContext.Provider value={{ businesses, actions }}>
        {children}
    </BusinessListingContext.Provider>
}

