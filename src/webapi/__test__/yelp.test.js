import { SearchBusinesses } from "../yelp";
import YelpSearchResponse from "./yelp.search.response.json"

describe("Yelp API", () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(YelpSearchResponse),
            status: 200
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    it("Should get the search result from the search api", async () => {
        const results = await SearchBusinesses("sushi");
        expect(results).toBe(YelpSearchResponse.businesses);
    });


    it("Should bubble up the exception message from api", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.reject("Wrong input parameters"),
                status: 500,
            })
        );
        return SearchBusinesses("sushi").catch(e => expect(e).toEqual("Wrong input parameters"));
    });

});