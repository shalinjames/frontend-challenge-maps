import React, { useState } from "react";
import useFetchFoodCategories from "../hooks/useFetchFoodCategories";
import useSearchBusinesses from "../hooks/useSearchBusinesses";

export const BusinessListingContext = React.createContext({
    businesses: [],
    actions: {},
    foodCategories: []
});

export const BusinessListingProvider = ({ children }) => {

    const [foodType, setFoodType] = useState("Burger");
    const businesses = useSearchBusinesses(foodType);
    const foodCategories = useFetchFoodCategories();
    const actions = { setFoodType };

    return <BusinessListingContext.Provider value={{ businesses, actions, foodCategories }}>
        {children}
    </BusinessListingContext.Provider>
}

