import React, { useContext } from "react";
import MapView from "./MapView";
import { CreateMap, CreateNewMarkers } from "./MapVM";
import { BusinessListingContext } from "../../contexts/BusinessListing";
import "./Map.css"


const Map = () => {
    const { businesses } = useContext(BusinessListingContext);

    if (businesses === null) {
        return null;
    }

    return <MapView businesses={businesses} actions={{ CreateNewMarkers, CreateMap }}
    />
}

export default Map;