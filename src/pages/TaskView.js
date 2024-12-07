import React, { useState } from "react";
import CurrentAssessment from "../components/CurrentAssessment";
import BatchComponent from "../components/ListTable";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TaskView() {
  const [activeTab, setActiveTab] = useState("current");
  const activeTabClass =
    "bg-[#31ABEB] text-white p-2 shadow-md cursor-pointer font-bold";
  const normalTab = "text-gray-400 p-2  cursor-pointer font-bold";
  const apiUrl = "task/getTaskHistory";
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.user);
  const formatDatetime = (dateString, type) => {
    const date = new Date(dateString);
    if (type === "date") {
      return `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;
    } else {
     return moment(dateString).format("hh:mm a");
     
    }
  };
  const config = [
    {
      colname: "ASS Type",
      sortable: false,
      className: "",
      data: "assessment_type",
      render: (batch) => (
        <span className="capitalize">{batch.assessment_type}</span>
      ),
    },
    {
      colname: "ASS title",
      sortable: false,
      className: "",
      data: "title",
      render: (batch) => (
        <span className="capitalize">{batch.title}</span>
      ),
    },
    {
      colname: "Particular",
      sortable: true,
      className: "",
      data: "title",
      render: (value) => <span>{value.particular_id?.label}</span>,
    },
    {
      colname: "Question",
      sortable: true,
      className: "",
      data: "questions",
      render: (batch) => (
        <span className="badge">{batch.questions.length}</span>
      ),
    },
    {
      colname: "Mark",
      sortable: true,
      className: "",
      data: "questions",
      render: (batch) => (
        
          batch?.submission_status == 2 ?
        
        <CircularProgressbar  value={percentageCal(batch.mark,batch.questions.length ).toFixed(2)} text={batch.mark + ' / ' +batch.questions.length } /> :'----'
      ),
    },
    {
      colname: "Start Time",
      sortable: false,
      className: "",
      data: "start_date",
      render: (batch) => (
        <span className="">
          {formatDatetime(batch.start_time, "date") +
            "  " +
            formatDatetime(batch.start_time, "time")}
        </span>
      ),
    },
    {
      colname: "End Time",
      sortable: false,
      className: "",
      data: "end_date",
      render: (batch) => (
        <span className="">
          {formatDatetime(batch.end_date, "date") +
            "  " +
            formatDatetime(batch.end_time, "time")}
        </span>
      ),
    },
    {
      colname: "Action",
      sortable: false,
      className: "",
      data: "questions",
      render: (batch) => (
        <span className="space-x-2">
        <button
          onClick={() => batch.submission_status == 1  ? toast.error('You have Not Participate this Assessment') : navigate('/taskDetails/'+ batch._id)}
          className="btn btn-sm btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={batch.submission_status != 2}
        >
          View
        </button>
        {/* <button
          onClick={() => handleEdit(batch)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button> */}
      </span>
      ),
    },
  ];
  const percentageCal = (mark,total)=>{
    return (mark /total) *100
  }
  return (
    <div className=" bg-white rounded-lg mt-2 scrollable-container-100 ">
      <div className="container mx-auto p-4 ">
        <div value={activeTab} onValueChange={setActiveTab} >
          <div className="grid w-full grid-cols-2 bg-gray-200 p-2 text-center ">
            <div
              className={activeTab == "current" ? activeTabClass : normalTab}
              value="current"
              onClick={() => setActiveTab("current")}
            >
              Current Assessment
            </div>
            <div
              value="history"
              className={activeTab == "history" ? activeTabClass : normalTab}
              onClick={() => setActiveTab("history")}
            >
              Assessment History
            </div>
          </div>
          <div className="w-full">
            {activeTab == "current" ? (
              <div value="current" className="w-full">
                <CurrentAssessment />
              </div>
            ) : (
              <div value="history">
                <BatchComponent
                  title="Assessment Overview"
                  apiUrl={apiUrl}
                  config={config}
                  useQuery={{
                    user_id:isLoggedIn?._id
                  }}
                  // ref={tableRef}
                  // onClickRow={handleRowSelect}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskView;
