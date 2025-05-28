import React from "react";
import "../Css/CheckBox.css";

export default function CheckBox({id, title,handleInputChange,selectedCheckbox }) {
return (
  <label className="checkbox-container">
    {title}
    <input
      id={id}
      name={title} 
      type="checkbox"
      className="checkbox-input"
      onChange={handleInputChange} />
    <span className="checkmark"></span>
  </label>
);
}

