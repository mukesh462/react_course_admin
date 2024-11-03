import React, { useState } from "react";
import Select from "react-select";

const NormalSelect = ({
  options,
  onChange,
  value,
  isMulti = false,
  placeholder = "Select options...",
}) => {
  const [inputValue, setInputValue] = useState(""); // Track the input value



  return (
    <Select
      options={options} // Use the filtered options
      isMulti={isMulti}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="mt-2 block w-full border rounded-md p-2"
      onInputChange={(inputValue) => setInputValue(inputValue)} // Update input value on input change
    />
  );
};

export default NormalSelect;
