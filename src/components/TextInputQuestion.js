import React, { useState } from "react";

export function TextInputQuestion({ question, numberOf, onAnswerChange }) {
  const [answers, setAnswers] = useState(Array(numberOf).fill(""));

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswerChange(newAnswers); // Trigger change only on input update
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg mb-4">
      <div className="p-3 border-b border-[#31ABEB]">
        <h2 className="text-lg font-semibold text-[#162C97]">{question}</h2>
      </div>
      <div className="p-3">
        {Array.from({ length: numberOf }, (_, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <input
              type="text"
              id={`answer-${question}-${index}`}
              value={answers[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border border-[#31ABEB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:border-transparent"
              placeholder={`Answer ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
