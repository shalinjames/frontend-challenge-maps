import React, { useContext } from "react";
import { BusinessListingContext } from "../../contexts/BusinessListing";
import { Select } from "../UI";

const FoodSelector = () => {
    const { actions } = useContext(BusinessListingContext);
    const foodCategories = actions.useFetchFoodCategories();

    if (foodCategories === null) {
        return "Loading...";
    }

    return <Select options={foodCategories}
        handleChange={actions.setFoodType}
    />
}

export default FoodSelector;