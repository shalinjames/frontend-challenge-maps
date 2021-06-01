import React, { useContext } from "react";
import BusinessCard from "./BusinessCard";
import { BusinessListingContext } from "../../contexts/BusinessListing";

const BusinessCards = () => {
    const { businesses } = useContext(BusinessListingContext);
    if (businesses === null) {
        return null;
    }
    return businesses.map(business => <BusinessCard key={business.id} business={business} />);
}

export default BusinessCards;