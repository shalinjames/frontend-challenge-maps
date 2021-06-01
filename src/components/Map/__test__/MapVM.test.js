import { MAP_SETTINGS, CreateMap, CreateMarker } from "../MapVM";


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

        CreateMarker(new global.google.maps.Map(), "TestTitle", { latitude: 10, longitude: 10 });

        expect(global.google.maps.LatLng).toHaveBeenLastCalledWith(10, 10);

        expect(global.google.maps.Marker).toHaveBeenCalledWith({
            "map": expect.anything(),
            "position": expect.anything(),
            "title": "TestTitle",
        });
    });
});