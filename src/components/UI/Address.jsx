import React from "react";

const Address = ({ street, locationPinCode, phone }) => {
    return <>
        <p>{street}<br />{locationPinCode}</p>
        <p>{phone}</p>
    </>
}

export default Address;