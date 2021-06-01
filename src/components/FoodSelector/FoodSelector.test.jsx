import React from "react";
import { render, screen } from "@testing-library/react";
import FoodSelector from "./FoodSelector";
import { BusinessListingContext } from "../../contexts/BusinessListing";
import FoodCategoriesList from "../../webapi/food.categories.json";

describe("<FoodSelector />", () => {

    let useFetchFoodCategories;
    const renderComponent = (mockResponse) => {
        useFetchFoodCategories = jest.fn().mockReturnValue(mockResponse);
        render(<BusinessListingContext.Provider value={{ actions: { useFetchFoodCategories } }}>
            <FoodSelector />
        </BusinessListingContext.Provider>)
    };

    test("should not render anything if there is no value provided", () => {
        renderComponent(null);
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });

    test("should call the useFetchFoodCategories hook", () => {
        renderComponent(FoodCategoriesList);
        expect(useFetchFoodCategories).toHaveBeenCalled();
    });

    test("should display the options provided by the hook", () => {
        renderComponent(FoodCategoriesList);
        const comboBox = screen.queryByRole("combobox");
        expect(comboBox).toBeInTheDocument();
        expect(comboBox.children.length).toEqual(3);
        const options = [...comboBox.children].map(option => option.textContent);
        expect(options).toEqual(["Burger", "Pizza", "Sushi"]);
    });
})