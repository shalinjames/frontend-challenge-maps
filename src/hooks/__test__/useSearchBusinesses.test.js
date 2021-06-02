import React from "react";
import { render, screen, act } from "@testing-library/react";
import * as yelp from "../../webapi/yelp";
import useSearchBusinesses from "../useSearchBusinesses";


describe("useSearchBusinesses", () => {

    const testData = [
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

    const TestComponent = ({ useSearchBusinesses, query }) => {
        const businesses = useSearchBusinesses(query);

        if (businesses === null) {
            return null
        }

        return <div>
            {businesses.map(business =>
                <p key={business.id} data-testid="business" data-id={business.id}>
                    {business.name}
                </p>)}
        </div>

    }

    beforeEach(() => { jest.resetAllMocks(); });

    test("should call the SearchBusinesses with the provided parameters", async () => {
        const searchRestaurantsSpy = jest.spyOn(yelp, "SearchBusinesses").mockReturnValue(testData);
        await act(async () => {
            await render(<TestComponent useSearchBusinesses={useSearchBusinesses} query={"Pizza"} />);
        });
        expect(searchRestaurantsSpy).toHaveBeenCalledTimes(1);
        expect(searchRestaurantsSpy).toHaveBeenCalledWith({
            limit: 10,
            location: "Berlin, Germany",
            term: "Pizza"
        });
        const businessCategoryEls = screen.queryAllByTestId("business");
        expect(businessCategoryEls.length).toEqual(3);
        [...businessCategoryEls].forEach((businessEl, index) => {
            expect(businessEl).toHaveAttribute("data-id", testData[index].id);
            expect(businessEl).toHaveTextContent(testData[index].name);
        });
    });

    test("Should not call the SearchBusinesses when query is null", async () => {
        const searchRestaurantsSpy = jest.spyOn(yelp, "SearchBusinesses").mockReturnValue(testData);
        await act(async () => {
            await render(<TestComponent useSearchBusinesses={useSearchBusinesses} query={null} />);
        });

        expect(searchRestaurantsSpy).toHaveBeenCalledTimes(0);
        expect(screen.queryByTestId("business")).not.toBeInTheDocument();
    });


});