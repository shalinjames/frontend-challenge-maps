import React from "react";
import { render, act, screen } from "@testing-library/react";
import MapView from "../MapView";
import { MAP_SETTINGS } from "../MapVM";
import BusinessListingsJson from "./business.list.json"


describe("<MapView />", () => {

    let CreateMap, CreateMarker;

    beforeEach(() => {
        CreateMap = jest.fn().mockReturnValue({});
        CreateMarker = jest.fn()
    });

    test("should render the component without actual google map", () => {
        act(() => {
            render(<MapView businesses={[]} actions={{ CreateMarker, CreateMap }} />);
        });
        const mapElement = screen.queryByTestId("places-map");
        expect(CreateMap).toHaveBeenCalledWith(mapElement);
    });

    test("should call the  google map Marker class for businesses", async () => {
        await act(async () => {
            await render(<MapView businesses={BusinessListingsJson} actions={{ CreateMarker, CreateMap }} />);
        });

        expect(CreateMarker).toHaveBeenCalledTimes(3);
        BusinessListingsJson.forEach((business, index) => {
            expect(CreateMarker).toHaveBeenNthCalledWith(index + 1, {}, business.name, business.coordinates);
        })
    });
});