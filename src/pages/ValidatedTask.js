import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../components/useApi";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { TextInputQuestion } from "../components/TextInputQuestion";
import { Question } from "../components/Question";

function ValidatedTask() {
  const isLoggedIn = useSelector((state) => state.login.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestion] = useState([]);
  const [allData, setallData] = useState({});
  const { id } = useParams();
  const { request } = useApi();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("post", "task/getAnswer", {
        assessment_id: id,
        student_id: isLoggedIn?._id,
      });
      if (response.status) {
        const { data } = response;

        console.log(data);
        setallData(data);
        setQuestion(data.questions);
      }
    };
    fetchData();
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

  return (
    <div>
      <div className="m-5">
        <button
          onClick={() => navigate("/assessment")}
          className="btn btn-secondary flex gap-2 items-center justify-center mb-4"
        >
          <IoChevronBackCircleOutline size={20} /> Back
        </button>

        <div
          className="scrollable-container flex flex-col px-10"
          ref={containerRef}
        >
          {currentQuestions.map((q) =>
            q.question_type === "input" ? (
              <TextInputQuestion
                key={q.id}
                readOnly
                answer={q?.answer}
                question={q.question_text}
                numberOf={q.numberOf || 1} // Default to 1 if numberOf is not provided
                onAnswerChange={(textInputAnswers) =>
                  handleSelect(q.id, textInputAnswers)
                }
              />
            ) : (
              <Question
                readOnly
                answer={q?.answer}
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
            onClick={currentPage === totalPages - 1 ? null : handleNext}
            className="px-6 py-2 bg-[#31ABEB] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#162C97] transition-colors duration-200"
          >
            {currentPage === totalPages - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ValidatedTask;
