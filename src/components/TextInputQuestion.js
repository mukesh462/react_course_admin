import React, { useState } from "react";
import YesNoRadio from "./YesNo";
import YesNoSwitch from "./YesNo";
import { TbXboxX } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";

export function TextInputQuestion({
  question,
  numberOf,
  onAnswerChange,
  readOnly = false,
  answer,
  review,
  action = "create",
  index,
  remark = "",
}) {
  const [answers, setAnswers] = useState(
    answer ? answer : Array(numberOf).fill("")
  );

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswerChange(newAnswers); // Trigger change only on input update
  };

  return (
    <div className="w-full max-w-md  bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg mb-4 self-start">
      <div className="p-3 border-b border-[#31ABEB]">
        <h2 className="text-lg font-semibold text-[#162C97]">
          {index + 1}. {question}
        </h2>
      </div>
      <div className="p-3">
        {Array.from({ length: numberOf }, (_, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <input
              type="text"
              id={`answer-${question}-${index}`}
              value={answers[index]}
              disabled={readOnly}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full p-2 border border-[#31ABEB] disabled:cursor-not-allowed  rounded-md focus:outline-none focus:ring-2 focus:ring-[#31ABEB] focus:border-transparent"
              placeholder={`Answer ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {action == "view" && (
        <>
          <p
            className={`${
              review == "no" ? "text-red-500 " : "text-green-600 "
            } font-bold py-2 text-center bg-gray-300`}
          >
            {review == "no" ? (
              <div className=" flex justify-center items-center gap-2">
                <span>Your Answer is incorrect</span>
                <TbXboxX color="red" />
              </div>
            ) : (
              <div className=" flex justify-center items-center gap-2">
                <span> Your Answer is Correct</span>
                <SiTicktick color="green" />
              </div>
            )}
          </p>
          <div className="py-1  mx-2">
            <p className="text-black font-medium">Remark :</p>
            <p>{remark}</p>
          </div>
        </>
      )}
      {action == "validate" && (
        <div className="flex justify-end items-center gap-2 my-2">
          <YesNoSwitch value={review} onChange={(e) => onAnswerChange(e)} />
        </div>
      )}
    </div>
  );
}
