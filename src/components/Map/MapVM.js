
export const MAP_SETTINGS = {
    COORDS: {
        'Europe/Berlin': { lat: 52.518611, lng: 13.408333 },
    },
    INITIAL_ZOOM: 10
}

export const CreateMap = (mapEl) => {
    return new window.google.maps.Map(mapEl, {
        center: MAP_SETTINGS.COORDS['Europe/Berlin'],
        zoom: MAP_SETTINGS.INITIAL_ZOOM
    });
}

const createMarker = (map, title, coordinates) => {
    const { latitude, longitude } = coordinates;
    const latLng = new window.google.maps.LatLng(latitude, longitude)
    return new window.google.maps.Marker({
        position: latLng,
        map,
        title,
    });
}

export const CreateNewMarkers = (map, businesses) => {
    const newMarkers = [];
    businesses.forEach(business => {
        const newMarker = createMarker(map, business.name, business.coordinates);
        newMarkers.push(newMarker);
    });
    return newMarkers;
}