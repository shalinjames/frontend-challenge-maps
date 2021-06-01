import React from "react";

const CardHeader = ({ title, url }) => {
    return <h4><a href={url}>{title}</a></h4>
}

export default CardHeader;