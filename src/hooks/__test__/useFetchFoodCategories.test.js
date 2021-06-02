import React from "react";
import { render, screen, act } from "@testing-library/react";
import * as yelp from "../../webapi/yelp";
import useFetchFoodCategories from "../useFetchFoodCategories";

describe("useFetchFoodCategories", () => {

    const testData = [{
        "value": "Burger",
        "displayTitle": "Burger"
    },
    {
        "value": "Salad",
        "displayTitle": "Salad"
    },
    {
        "value": "PASTA",
        "displayTitle": "Pasta"
    }];

    const TestComponent = ({ useFetchFoodCategories }) => {
        const foodCategories = useFetchFoodCategories();

        if (foodCategories === null) {
            return null
        }

        return <div>
            {foodCategories.map(category =>
                <p key={category.value} data-testid="food-category" data-value={category.value}>
                    {category.displayTitle}
                </p>)}
        </div>

    }

    beforeEach(() => { jest.resetAllMocks(); });

    test("should return the food categories when hook is called", async () => {
        const yelpSpy = jest.spyOn(yelp, "FoodCategories").mockReturnValue({
            default: testData
        });

        await act(async () => {
            await render(<TestComponent useFetchFoodCategories={useFetchFoodCategories} />)
        });

        expect(yelpSpy).toHaveBeenCalledTimes(1);
        const foodCategoryEls = screen.queryAllByTestId("food-category");
        expect(foodCategoryEls.length).toEqual(3);
        [...foodCategoryEls].forEach((foodCategory, index) => {
            expect(foodCategory).toHaveAttribute("data-value", testData[index].value);
            expect(foodCategory).toHaveTextContent(testData[index].displayTitle);
        });

    });

    test("should return nothing when food categories returns nothing", async () => {
        const yelpSpy = jest.spyOn(yelp, "FoodCategories").mockReturnValue({
            default: null
        });

        await act(async () => {
            await render(<TestComponent useFetchFoodCategories={useFetchFoodCategories} />)
        });

        expect(yelpSpy).toHaveBeenCalledTimes(1);
        expect(screen.queryAllByTestId("food-category").length).toEqual(0);
    })

})