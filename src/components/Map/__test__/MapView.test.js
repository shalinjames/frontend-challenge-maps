import React from "react";
import { render, act, screen } from "@testing-library/react";
import MapView from "../MapView";
import BusinessListingsJson from "../../__test__/business.list.json";


describe("<MapView />", () => {

    let CreateMap, CreateNewMarkers;

    beforeEach(() => {
        CreateMap = jest.fn().mockReturnValue({});
        CreateNewMarkers = jest.fn()
    });

    test("should render the component without actual google map", () => {
        act(() => {
            render(<MapView businesses={[]} actions={{ CreateNewMarkers, CreateMap }} />);
        });
        const mapElement = screen.queryByTestId("places-map");
        expect(CreateMap).toHaveBeenCalledWith(mapElement);
    });

    test("should call the  google map Marker class for businesses", async () => {
        await act(async () => {
            await render(<MapView businesses={BusinessListingsJson} actions={{ CreateNewMarkers, CreateMap }} />);
        });

        expect(CreateNewMarkers).toHaveBeenCalledWith({}, BusinessListingsJson);

    });
});