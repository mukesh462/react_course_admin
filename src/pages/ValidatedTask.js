import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../components/useApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { TextInputQuestion } from "../components/TextInputQuestion";
import { Question } from "../components/Question";
import Swal from "sweetalert2";
import { CircularProgressbar } from "react-circular-progressbar";

function ValidatedTask({ page }) {
  const isLoggedIn = useSelector((state) => state.login.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [allData, setAllData] = useState({});
  const { id, student_id } = useParams();
  const { request } = useApi();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  useEffect(() => {
    const fetchData = async () => {
      const response = await request("post", "task/getAnswer", {
        assessment_id: id,
        student_id: page == "view" ? isLoggedIn?._id : student_id,
      });
      if (response.status) {
        const { data } = response;
        setAllData(data);
        setQuestions(data.questions);
      }
    };
    fetchData();
  }, [id, isLoggedIn, request]);

  const handleSelect = useCallback((questionId, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, review: answer } : q
      )
    );
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    scrollToTop();
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    scrollToTop();
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  console.log(allData, "aa");
  const finalSubmit = async () => {
    if (isLoggedIn?.isAdmin == 0) {
      toast.error("Admin only submit review");
      return;
    }
    const isAllValidated = questions.every((q) => q.review !== undefined);
    if (isAllValidated) {
      const mergedData = questions.map((question) => ({
        ...question,
        review: question.review || null,
      }));

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to Submit ? This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await request("post", "task/reviewAnswer/", {
          questions: mergedData,
          assessment_id: allData?.assessment_id,
          student_id: allData?.student_id,
          status: 2,
          main_id: allData?._id,
        });
        if (response.status) {
          Swal.fire(
            "Submitted!",
            "Assessment submitted successfully.",
            "success"
          );
          toast.success(response.message);
          navigate("/assessment");
        } else {
          Swal.fire("Error!", response.message, "error");
          toast.error(response.message);
        }
      }
    } else {
      toast.error("Need To Validate All Questions");
    }
  };

  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );
  const percentageCal = (mark,total)=>{
    return (mark /total) *100
  }
  return (
    <div>
      <div className="m-5">
        <div className="flex justify-between items-center gap-5 flex-wrap md:flex-nowrap bg-white px-5 rounded-lg py-2">
              <button
          onClick={() => navigate("/assessment")}
          className="btn btn-secondary flex gap-2 items-center justify-center mb-4 "
        >
          <IoChevronBackCircleOutline size={20} /> Back 
        </button>
        <div className="font-bold text-[#162C97]">Task Details</div>
        <div className="">
            <CircularProgressbar className="h-10"  value={percentageCal(questions.filter(e=> e.review == 'yes').length,questions.length)} text={questions.filter(e=> e.review == 'yes').length +'/' + questions.length} />
          
        </div>
      
        </div>
    

        <div
          className="scrollable-container flex flex-col justify-start items-center px-10 mt-2"
          ref={containerRef}
        >
          {currentQuestions.map((q,i) =>
            q.question_type === "input" ? (
              <TextInputQuestion
                key={q.id}
                readOnly
                answer={q?.answer}
                index={i}
                remark={q.remark}
                action={page}
                review={q.review || ""}
                question={q.question_text}
                numberOf={q.numberOf || 1}
                onAnswerChange={(textInputAnswers) =>
                  handleSelect(q.id, textInputAnswers)
                }
              />
            ) : (
              <Question
                readOnly
                answer={q?.answer}
                key={q.id}
                index={i}
                action={page}
                review={q.review || ""}
                question={q.question_text}
                remark={q.remark}
                options={q.options}
                onSelect={(option) => handleSelect(q.id, option)}
                selectedOption={q.review || ""}
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
          {
            currentPage === totalPages - 1 && page =='view' ? null:  <button
            onClick={currentPage === totalPages - 1 ? finalSubmit : handleNext}
            className="px-6 py-2 bg-[#31ABEB] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#162C97] transition-colors duration-200"
          >
            {currentPage === totalPages - 1 ? "Submit" : "Next"}
          </button>
          }
        
        </div>
      </div>
    </div>
  );
}

export default ValidatedTask;
