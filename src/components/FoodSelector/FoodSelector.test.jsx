import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import FoodSelector from "./FoodSelector";
import { BusinessListingContext } from "../../contexts/BusinessListing";
import FoodCategoriesList from "../../webapi/food.categories.json";

describe("<FoodSelector />", () => {

    let setFoodType;
    const renderComponent = (foodCategories) => {
        setFoodType = jest.fn();
        render(<BusinessListingContext.Provider value={{ actions: { setFoodType }, foodCategories }}>
            <FoodSelector />
        </BusinessListingContext.Provider>)
    };

    test("should not render anything if there is no value provided", () => {
        renderComponent(null);
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });

    test("should display the options provided by the hook", () => {
        renderComponent(FoodCategoriesList);
        const comboBox = screen.queryByRole("combobox");
        expect(comboBox).toBeInTheDocument();
        expect(comboBox.children.length).toEqual(3);
        const options = [...comboBox.children].map(option => option.textContent);
        expect(options).toEqual(["Burger", "Pizza", "Sushi"]);
    });

    test("should set the foodType on selecting a food category", () => {
        renderComponent(FoodCategoriesList);
        const foodType = "Pizza"
        const comboBox = screen.queryByRole("combobox");
        act(() => {
            fireEvent.change(comboBox, {
                target: {
                    value: foodType
                }

            });
        });

        expect(setFoodType).toHaveBeenLastCalledWith(foodType);
    });
})