import { useState, useEffect } from "react";
import { FoodCategories } from "../webapi/yelp"

const useFoodCategories = () => {
    const [foodCategories, setFoodCategories] = useState(null);

    const getFoodCategories = async () => {
        const categories = await FoodCategories();
        setFoodCategories(categories.default)
    }

    useEffect(() => {
        getFoodCategories();
    }, [])

    return foodCategories;
}

export default useFoodCategories;