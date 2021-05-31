import React from "react";
import { render, act } from "@testing-library/react";
import Map, { MAP_SETTINGS } from "./Map";
import BusinessListingsJson from "./__test__/business.list.json"


describe("<Map />", () => {
    global.google = {
        maps: {
            Map: jest.fn(),
            Marker: jest.fn(),
            LatLng: jest.fn()
        }
    }

    test("should render the component without actual google map", () => {
        const { lat, lng } = MAP_SETTINGS.COORDS['Europe/Berlin'];
        act(() => {
            render(<Map businesses={[]} />);
        });

        expect(global.google.maps.Map).toHaveBeenCalledWith(
            expect.anything(),
            { "center": { lat, lng }, "zoom": MAP_SETTINGS.INITIAL_ZOOM });
    });

    test("should call the  google map Marker class for businesses", () => {
        act(() => {
            render(<Map businesses={BusinessListingsJson} />);
        });

        expect(global.google.maps.Marker).toHaveBeenCalledTimes(3);
        expect(global.google.maps.Marker).toHaveBeenNthCalledWith(1, {
            "map": null,
            "position": expect.anything(),
            "title": "Stadtklause",
        });

        expect(global.google.maps.Marker).toHaveBeenNthCalledWith(2, {
            "map": null,
            "position": expect.anything(),
            "title": "Lorenz Adlon Esszimmer",
        });

        expect(global.google.maps.Marker).toHaveBeenNthCalledWith(3, {
            "map": null,
            "position": expect.anything(),
            "title": "Cocolo Ramen",
        });
    });
});