import React from "react";
import "./Card.css"

const Card = ({ imageUrl, title, children }) => {
    return <div className="card" data-testid="business-card">
        <img src={imageUrl} alt={title} />
        <div className="container">
            {children}
        </div>
    </div>
}

export default Card;