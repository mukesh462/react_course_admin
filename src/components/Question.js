import React from "react";

export function Question({
  question,
  options,
  onSelect,
  selectedOption,
  readOnly = false,
  answer,
}) {
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl my-2">
      <div className="p-3 border-b border-[#31ABEB]">
        <h2 className="text-xl font-bold text-[#162C97] mb-2">{question}</h2>
      </div>
      <div className="p-3">
        {options.map((option, index) => {
          const isSelected = answer ? answer === option : selectedOption === option;

          return (
            <div key={index} className="mb-1 last:mb-0">
              <label
                htmlFor={`option-${question}-${index}`}
                className={`flex items-center p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-[#31ABEB] text-white"
                    : "bg-white text-[#162C97] hover:bg-[#31ABEB] hover:bg-opacity-10"
                }`}
              >
                <input
                  type="radio"
                  id={`option-${question}-${index}`}
                  name={`question-${question}`}
                  value={option}
                  disabled={readOnly}
                  checked={isSelected}
                  onChange={() => onSelect(option)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 mr-4 flex-shrink-0 rounded-full border-2 ${
                    isSelected ? "border-white bg-white" : "border-[#31ABEB]"
                  }`}
                >
                  {isSelected && (
                    <div className="w-full h-full rounded-full bg-[#31ABEB] scale-50 transform transition-transform duration-200"></div>
                  )}
                </div>
                <span className="text-lg font-medium">{option}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
