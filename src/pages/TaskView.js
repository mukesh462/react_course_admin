import React, { useState } from "react";
import CurrentAssessment from "../components/CurrentAssessment";
import BatchComponent from "../components/ListTable";

function TaskView() {
  const [activeTab, setActiveTab] = useState("current");
  const activeTabClass =
    "bg-[#31ABEB] text-white p-2 shadow-md cursor-pointer font-bold";
  const normalTab = "text-gray-400 p-2  cursor-pointer font-bold";
  const apiUrl = "task/list";
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
  ];
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
