// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const AssessMent = () => {
  const apiUrl = "https://dummyjson.com/products"; // Replace with your actual API URL
  const navigate = useNavigate();
  const config = [
    {
      colname: "ID",
      sortable: true,
      className: "",
      data: "id",
      //   render: (batch) => <p>{batch.id}</p>,
    },
    {
      colname: "Title",
      sortable: true,
      className: "",
      data: "title",
    },
    {
      colname: "Price",
      sortable: true,
      className: "",
      data: "price",
      //   render: (batch) => <p className="badge">{batch.price}</p>,
    },
    {
      colname: "Stock",
      sortable: true,
      className: "",
      data: "stock",
      render: (batch) => (
        <button className="btn bg-orange-500 text-white btn-sm">Edit</button>
      ),
    },
  ];

  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent
        title="Assessment Overview"
        apiUrl={apiUrl}
        config={config}
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
