import React from "react";

export const MAP_SETTINGS = {
    COORDS: {
        'Europe/Berlin': { lat: 52.518611, lng: 13.408333 },
    },
    INITIAL_ZOOM: 10
}

class Map extends React.Component {

    mapsApiLoaded = null;
    mapInstance = null;

    componentDidMount() {
        this.mapsApiLoaded = window.setTimeout(this.checkMapsApi.bind(this), 200);
    }

    checkMapsApi = () => {
        if (window.google && window.google.maps) {
            window.clearTimeout(this.mapsApiLoaded);
            this.initMap();
        }
    }

    initMap = () => {
        const mapEl = document.getElementById('places-map');
        if (mapEl && !this.mapInstance) {
            this.mapInstance = new window.google.maps.Map(mapEl, {
                center: MAP_SETTINGS.COORDS['Europe/Berlin'],
                zoom: MAP_SETTINGS.INITIAL_ZOOM
            });
        }
    }

    render() {
        return <div id='places-map' className='places-map'></div>
    }

}

export default Map;