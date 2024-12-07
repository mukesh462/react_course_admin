import React, { useState, useEffect } from "react";

const YesNoSwitch = ({ value = "", onChange }) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value); // Update state if the parent changes the value prop
  }, [value]);

  const handleChange = (newValue) => {
    setSelected(newValue);
    if (onChange) onChange(newValue); // Notify parent of change
  };

  return (
    <div className="flex items-center gap-4">
      <label
        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
          selected === "yes"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleChange("yes")}
      >
        Yes
      </label>
      <label
        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
          selected === "no"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleChange("no")}
      >
        No
      </label>
    </div>
  );
};

export default YesNoSwitch;
