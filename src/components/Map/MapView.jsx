import React, { useEffect, useRef, useState } from "react";

const MapView = ({ businesses, actions }) => {
    const { CreateMap, CreateMarker } = actions
    const [mapInstance, setMapInstance] = useState(null);
    const mapElRef = useRef(null);

    useEffect(() => {
        if (mapElRef && !mapInstance) {
            setMapInstance(CreateMap(mapElRef.current));
        }
        return () => {
            setMapInstance(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapInstance) {
            businesses.forEach(business => CreateMarker(mapInstance, business.name, business.coordinates))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businesses, mapInstance])

    return <div id='places-map' data-testid="places-map" ref={mapElRef} className='places-map'></div>

}

export default MapView;