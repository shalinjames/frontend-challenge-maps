import React, { useContext } from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import { BusinessListingContext, BusinessListingProvider } from "./BusinessListing";
import * as useFetchFoodCategories from "../hooks/useFetchFoodCategories";
import * as useSearchBusinesses from "../hooks/useSearchBusinesses";


describe("BusinessListing Context", () => {

    const testBusinessData = [
        {
            id: "testId1",
            name: "testName1"
        },
        {
            id: "testId2",
            name: "testName2"
        },
        {
            id: "testId3",
            name: "testName3"
        }
    ];

    const testFoodCategories = [{
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

    const TestComponent = () => {
        const { businesses, actions, foodCategories } = useContext(BusinessListingContext);

        return <div>
            <input type="text" onChange={(e) => actions.setFoodType(e.target.value)} data-testid="food-type" name="food-type" />
            {(businesses || []).map(business =>
                <p key={business.id} data-testid="business" data-id={business.id}>
                    {business.name}
                </p>)}
            {(foodCategories || []).map(category =>
                <p key={category.value} data-testid="food-category" data-value={category.value}>
                    {category.displayTitle}
                </p>)}
        </div>

    }

    beforeEach(() => {
        jest.resetAllMocks();
    })

    describe("when useSearchBusinesses is provided", () => {
        test("Should call the useSearchBusinesses", async () => {
            const useSearchBusinessesSpy = jest.spyOn(useSearchBusinesses, 'default').mockReturnValue(testBusinessData);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useSearchBusinessesSpy).toHaveBeenCalledWith("Burger");
        });

        test("Should show the businesses provided by useSearchBusinesses", async () => {
            const useSearchBusinessesSpy = jest.spyOn(useSearchBusinesses, 'default').mockReturnValue(testBusinessData);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useSearchBusinessesSpy).toHaveBeenCalledWith("Burger");
            const businessCategoryEls = screen.queryAllByTestId("business");
            expect(businessCategoryEls.length).toEqual(3);
            [...businessCategoryEls].forEach((businessEl, index) => {
                expect(businessEl).toHaveAttribute("data-id", testBusinessData[index].id);
                expect(businessEl).toHaveTextContent(testBusinessData[index].name);
            });
        });

        test("Should provide null when received null from the useSearchBusinesses", async () => {
            const useSearchBusinessesSpy = jest.spyOn(useSearchBusinesses, 'default').mockReturnValue(null);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useSearchBusinessesSpy).toHaveBeenCalledWith("Burger");
            expect(screen.queryByTestId("business")).not.toBeInTheDocument();
        });
    });


    describe("When useFetchFoodCategories is provided", () => {
        test("should call the useFetchFoodCategories", async () => {
            const useFetchFoodCategoriesSpy = jest.spyOn(useFetchFoodCategories, 'default').mockReturnValue(testFoodCategories);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useFetchFoodCategoriesSpy).toHaveBeenCalledTimes(1);
        });

        test("Should show the food categories fetched from useFetchFoodCategories", async () => {
            const useFetchFoodCategoriesSpy = jest.spyOn(useFetchFoodCategories, 'default').mockReturnValue(testFoodCategories);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useFetchFoodCategoriesSpy).toHaveBeenCalledTimes(1);
            const foodCategoryEls = screen.queryAllByTestId("food-category");
            expect(foodCategoryEls.length).toEqual(3);
            [...foodCategoryEls].forEach((foodCategory, index) => {
                expect(foodCategory).toHaveAttribute("data-value", testFoodCategories[index].value);
                expect(foodCategory).toHaveTextContent(testFoodCategories[index].displayTitle);
            });
        });

        test("Should provide null when received null from the useFetchFoodCategories", async () => {
            const useFetchFoodCategoriesSpy = jest.spyOn(useFetchFoodCategories, 'default').mockReturnValue(null);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useFetchFoodCategoriesSpy).toHaveBeenCalledTimes(1);
            expect(screen.queryByTestId("food-category")).not.toBeInTheDocument();
        });
    });

    describe("When foodType is changed", () => {
        test("Should call the useSearchBusinesses on foodType change", async () => {
            const useSearchBusinessesSpy = jest.spyOn(useSearchBusinesses, 'default').mockReturnValue(testBusinessData);
            await act(async () => {
                await render(<BusinessListingProvider>
                    <TestComponent />
                </BusinessListingProvider>)
            });

            expect(useSearchBusinessesSpy).toHaveBeenCalledWith("Burger");
            expect(useSearchBusinessesSpy).toHaveBeenCalledTimes(1);

            const foodTypeInput = screen.queryByTestId("food-type");

            await act(async () => {
                await fireEvent.change(foodTypeInput, {
                    target: {
                        value: "Pizza"
                    }
                })
            });

            expect(useSearchBusinessesSpy).toHaveBeenCalledWith("Pizza");
            expect(useSearchBusinessesSpy).toHaveBeenCalledTimes(2);

        });
    });
});