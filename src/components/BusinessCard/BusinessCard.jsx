import React from "react";

const BusinessCard = ({ business }) => {
    return <div className="card" key={business.id}>
        <img src={business.image_url} alt={business.name} />
        <div className="container">
            <h4><a href={business.url}>{business.name}</a></h4>
            {
                business.location &&
                business.location.display_address &&
                (
                    <p>
                        {business.location.display_address[0]}
                        <br />
                        {business.location.display_address[1]}
                    </p>
                )
            }
            <p>{business.display_phone}</p>
        </div>
    </div>
}

export default BusinessCard;