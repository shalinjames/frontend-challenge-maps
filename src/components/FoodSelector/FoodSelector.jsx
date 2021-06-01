import React, { useContext } from "react";
import { BusinessListingContext } from "../../contexts/BusinessListing";
import { Select } from "../UI";

const FoodSelector = () => {
    const { actions } = useContext(BusinessListingContext);
    return <Select options={[{
        value: "Sushi",
        text: "Sushi"
    },
    {
        value: "Pizza",
        text: "Pizza"
    }]}
        handleChange={actions.setFoodType}
    />
}

export default FoodSelector;