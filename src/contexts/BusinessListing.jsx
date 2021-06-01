import React, { useState } from "react";
import useFetchFoodCategories from "../hooks/useFetchFoodCategories";
import useSearchBusinesses from "../hooks/useSearchBusinesses";

export const BusinessListingContext = React.createContext({
    businesses: [],
    actions: {},
    foods: []
});

export const BusinessListingProvider = ({ children }) => {

    const [foodType, setFoodType] = useState("Burger");
    const businesses = useSearchBusinesses(foodType);
    const actions = { setFoodType, useFetchFoodCategories };

    return <BusinessListingContext.Provider value={{ businesses, actions }}>
        {children}
    </BusinessListingContext.Provider>
}

