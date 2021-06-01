import { MAP_SETTINGS, CreateMap, CreateNewMarkers } from "../MapVM";
import BusinessListingsJson from "../../__test__/business.list.json"


describe("MapViewModel Test", () => {
    global.google = {
        maps: {
            Map: jest.fn().mockReturnValue("Map"),
            Marker: jest.fn(),
            LatLng: jest.fn()
        }
    }

    beforeEach(() => {
        global.google.maps.Map.mockClear();
        global.google.maps.Marker.mockClear();
        global.google.maps.LatLng.mockClear();
    });


    test("should render the component without actual google map", () => {
        const mockElement = document.createElement("div");
        CreateMap(mockElement);
        const { lat, lng } = MAP_SETTINGS.COORDS["Europe/Berlin"]
        expect(global.google.maps.Map).toHaveBeenCalledWith(mockElement, {
            "center": { lat, lng },
            "zoom": MAP_SETTINGS.INITIAL_ZOOM
        });
    });

    test("should call the  google map Marker class for businesses", async () => {

        const markers = CreateNewMarkers(new global.google.maps.Map(), BusinessListingsJson);

        expect(markers.length).toEqual(BusinessListingsJson.length);

        BusinessListingsJson.forEach((business, index) => {
            const { latitude, longitude } = business.coordinates;
            expect(global.google.maps.LatLng).toHaveBeenNthCalledWith(index + 1, latitude, longitude);

            expect(global.google.maps.Marker).toHaveBeenNthCalledWith(index + 1, {
                "map": expect.anything(),
                "position": expect.anything(),
                "title": business.name,
            });
        })

    });
});