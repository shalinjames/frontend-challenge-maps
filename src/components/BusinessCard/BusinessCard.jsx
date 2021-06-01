import React from "react";
import { Card, CardHeader, Address } from "../UI";

const BusinessCard = ({ business }) => {
    return <Card imageUrl={business.image_url} title={business.name}>
        <CardHeader title={business.name} url={business.url} />
        {business.location && business.location.display_address ? <Address
            street={business.location.display_address[0]}
            locationPinCode={business.location.display_address[1]}
            phone={business.display_phone} /> : ""
        }
    </Card>
}

export default BusinessCard;