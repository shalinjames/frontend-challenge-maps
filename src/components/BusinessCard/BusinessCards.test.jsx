import React from "react";
import { render, screen } from "@testing-library/react";
import BusinessCards from "./BusinessCards";
import BusinessListJson from "../__test__/business.list.json";
import { BusinessListingContext } from "../../contexts/BusinessListing";

describe("<BusinessCards />", () => {

    describe("Empty Provider", () => {
        test("Should not render anything if provider has no value", () => {
            render(<BusinessListingContext.Provider value={{ businesses: null }}>
                <BusinessCards />
            </BusinessListingContext.Provider>);
        });
        expect(screen.queryByTestId("business-card")).not.toBeInTheDocument();
    });

    describe("Provider with values", () => {
        test("should display the the provided business cards", () => {
            render(<BusinessListingContext.Provider value={{ businesses: BusinessListJson }}>
                <BusinessCards />
            </BusinessListingContext.Provider>);

            const businessCards = screen.queryAllByTestId("business-card");
            expect(businessCards.length).toEqual(3);

            businessCards.forEach((businessCard, index) => {
                expect(businessCard).toHaveTextContent(new RegExp(BusinessListJson[index].name))
            });
        });
    });

})