import React, { useContext } from "react";
import MapView from "./MapView";
import { CreateMap, CreateNewMarkers } from "./MapVM";
import { BusinessListingContext } from "../../contexts/BusinessListing";


const Map = () => {
    const { businesses } = useContext(BusinessListingContext);

    return <MapView businesses={businesses} actions={{ CreateNewMarkers, CreateMap }}
    />
}

export default Map;