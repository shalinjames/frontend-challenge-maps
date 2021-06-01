import React from "react";

const Card = ({ imageUrl, title, children }) => {
    return <div className="card">
        <img src={imageUrl} alt={title} />
        <div className="container">
            {children}
        </div>
    </div>
}

export default Card;