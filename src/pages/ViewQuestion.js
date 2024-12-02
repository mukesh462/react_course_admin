import React, { useCallback, useEffect, useRef, useState } from "react";
import { Question } from "../components/Question";
import { TextInputQuestion } from "../components/TextInputQuestion";
import { useParams } from "react-router-dom";
import useApi from "../components/useApi";

// const questions = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     question_type: "input",
//     numberOf: 4,
//   },
//   {
//     id: 2,
//     question: "Which planet is known as the Red Planet?",
//     options: ["Mars", "Venus", "Jupiter", "Saturn"],
//   },
//   {
//     id: 3,
//     question: "Who painted the Mona Lisa?",
//     options: [
//       "Vincent van Gogh",
//       "Leonardo da Vinci",
//       "Pablo Picasso",
//       "Michelangelo",
//     ],
//   },
//   {
//     id: 4,
//     question: "What is the largest ocean on Earth?",
//     options: [
//       "Atlantic Ocean",
//       "Indian Ocean",
//       "Arctic Ocean",
//       "Pacific Ocean",
//     ],
//   },
//   {
//     id: 5,
//     question: "Which element has the chemical symbol 'O'?",
//     options: ["Gold", "Silver", "Oxygen", "Iron"],
//   },
//   {
//     id: 6,
//     question: "What is the tallest mountain in the world?",
//     options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Matterhorn"],
//   },
// ];

export default function ViewQuestion() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestion] = useState([]);
  const [allData, setallData] = useState({})
  const { id } = useParams();
  const { request } = useApi();
  const containerRef = useRef(null);
  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("get", "task/" + id);
      if (response.status) {
        const { data } = response;
        console.log(data)
        setallData(data);
        setQuestion(data.questions)
      }
    };
    fetchData()
  }, []);

  const handleSelect = useCallback((questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    scrollToTop();
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    scrollToTop();
  };

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleSubmit = () => {
    const mergedData = questions.map((question) => ({
      ...question,
      answer: selectedAnswers[question.id] || null,
    }));

    console.log("Merged Questions and Answers:", mergedData);
  };
  return (
    <div className="m-5">
      <div
        className="scrollable-container flex flex-col px-10"
        ref={containerRef}
      >
        {currentQuestions.map((q) =>
          q.question_type === "input" ? (
            <TextInputQuestion
              key={q.id}
              question={q.question_text}
              numberOf={q.numberOf || 1} // Default to 1 if numberOf is not provided
              onAnswerChange={(textInputAnswers) =>
                handleSelect(q.id, textInputAnswers)
              }
            />
          ) : (
            <Question
              key={q.id}
              question={q.question_text}
              options={q.options}
              onSelect={(option) => handleSelect(q.id, option)}
              selectedOption={selectedAnswers[q.id] || null}
            />
          )
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="px-6 py-2 bg-[#31ABEB] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#162C97] transition-colors duration-200"
        >
          Previous
        </button>
        <button
          onClick={currentPage === totalPages - 1 ? handleSubmit : handleNext}
          className="px-6 py-2 bg-[#31ABEB] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#162C97] transition-colors duration-200"
        >
          {currentPage === totalPages - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
