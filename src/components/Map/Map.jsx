import React, { useEffect, useState } from "react";

export const MAP_SETTINGS = {
    COORDS: {
        'Europe/Berlin': { lat: 52.518611, lng: 13.408333 },
    },
    INITIAL_ZOOM: 10
}

const Map = ({ businesses }) => {

    const [mapInstance, setMapInstance] = useState(null);

    useEffect(() => {
        if (window.google && window.google.maps) {
            initMap();
        }
    }, [window.google]);

    useEffect(() => {
        businesses.forEach(business => {
            const latLng = new window.google.maps.LatLng(business.coordinates.latitude, business.coordinates.longitude)
            new window.google.maps.Marker({
                position: latLng,
                map: mapInstance,
                title: business.name,
            });
        })
    }, [businesses])


    const initMap = () => {
        const mapEl = document.getElementById('places-map');
        if (mapEl && !mapInstance) {
            setMapInstance(new window.google.maps.Map(mapEl, {
                center: MAP_SETTINGS.COORDS['Europe/Berlin'],
                zoom: MAP_SETTINGS.INITIAL_ZOOM
            }));
        }
    }

    return <div id='places-map' className='places-map'></div>


}

export default Map;