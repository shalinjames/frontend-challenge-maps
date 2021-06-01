import React from "react";

const Select = ({ options, handleChange, defaultValue }) => {

    const handleSelectChange = (event) => {
        const { target: { value } } = event;
        handleChange(value);
    }

    return <div include="form-input-select()">
        <select onChange={handleSelectChange}>
            {(options || []).map((option) => <option key={option.value} value={option.value}>{option.text}</option>)}
        </select>
    </div>
}

export default Select;