// Student.jsx or any other parent component
import React, { useRef } from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useApi from "../components/useApi";
import moment from "moment/moment";
import TaskView from "./TaskView";

const AssessMent = () => {
  const apiUrl = "task/list"; // Replace with your actual API URL
  const navigate = useNavigate();
const requestApi = useApi();
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
  const tableRef = useRef();
  const handleRefresh = () => {

    if (tableRef.current) {
      tableRef.current.useRefresh();
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
      data: "end_date",
      render: (batch) => (
        <span className="space-x-2">
          <button
            onClick={() => navigate('/assessment/'+ batch._id)}
            className="btn btn-sm btn-primary"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(batch)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };
  const handleEdit = async (e) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Assessment? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await requestApi.request(
        "delete",
        "task/deleteTask/" + e._id
      );
      if (response.status) {
        Swal.fire(
          "Deleted!",
          "Assessment has been deleted successfully.",
          "success"
        );
        toast.success(response.message);
        window.location.reload();
      } else {
        Swal.fire("Error!", response.message, "error");
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="">
            <TaskView/>
      <BatchComponent
        title="Assessment Overview"
        apiUrl={apiUrl}
        config={config}
        ref={tableRef}
        onClickRow={handleRowSelect}
        buttonProp={{
          onClick: () => navigate("/assessment/create"),
          title: "Assessment",
        }}
      />

    </div>
  );
};

export default AssessMent;
