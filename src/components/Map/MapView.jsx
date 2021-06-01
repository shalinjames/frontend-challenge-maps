import React, { useEffect, useRef, useState } from "react";

const MapView = ({ businesses, actions }) => {
    const { CreateMap, CreateNewMarkers } = actions
    const [mapInstance, setMapInstance] = useState(null);
    const mapElRef = useRef(null);
    const [markers, setMarkers] = useState([]);


    const clearMap = () => markers.forEach(marker => marker.setMap(null));

    useEffect(() => {
        if (!mapInstance) {
            setMapInstance(CreateMap(mapElRef.current));
        }
        return () => {
            setMapInstance(null);
            setMarkers(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapInstance) {
            clearMap();
            setMarkers(CreateNewMarkers(mapInstance, businesses));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businesses, mapInstance])

    return <div id='places-map' data-testid="places-map" ref={mapElRef} className='places-map'></div>

}

export default MapView;