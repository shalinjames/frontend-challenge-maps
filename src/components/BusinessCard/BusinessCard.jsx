import React from "react";

const BusinessCard = ({ business }) => {

    const contactDetails = (business) => {
        if (business.location && business.location.display_address) {
            return <p>
                {business.location.display_address[0]}
                <br />
                {business.location.display_address[1]}
            </p>
        }
    }


    return <div className="card" key={business.id}>
        <img src={business.image_url} alt={business.name} />
        <div className="container">
            <h4><a href={business.url}>{business.name}</a></h4>
            {contactDetails(business)}
            <p>{business.display_phone}</p>
        </div>
    </div>
}

export default BusinessCard;