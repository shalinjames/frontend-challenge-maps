import React from "react";
import "./Select.css"

const Select = ({ options, handleChange, defaultValue }) => {
    const handleSelectChange = (event) => {
        const { target: { value } } = event;
        handleChange(value);
    }

    return <div className="dropdown-select-box">
        <select onChange={handleSelectChange}>
            {(options || []).map((option) => <option key={option.value} value={option.value}>{option.displayTitle}</option>)}
        </select>
    </div>
}

export default Select;