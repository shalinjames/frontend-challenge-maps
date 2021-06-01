import React from "react";
import MapView from "./MapView";
import { CreateMap, CreateMarker } from "./MapVM";


const Map = ({ businesses }) => {
    return <MapView
        businesses={businesses}
        actions={{ CreateMarker, CreateMap }}
    />
}

export default Map;