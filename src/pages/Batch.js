// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const apiUrl = "batch/list"; 
  const navigate = useNavigate();
  const config = [
    {
      colname: "Course Name",
      sortable: true,
      className: "",
      data: "course_name",
    },
    {
      colname: "Batch",
      sortable: true,
      className: "",
      data: "batch_name",
      //   render: (batch) => <p className="badge">{batch.price}</p>,
    },
    {
      colname: "Status",
      sortable: true,
      className: "capitalize",
      data: "status",
      render: (batch) => (
        <span className={batch.status == "1" ? "badge badge-success" : "badge badge-error"}>{batch.status === 1 ?"Active":"In Active"}</span>
      ),
    },
    {
      colname: "Action",
      sortable: true,
      className: "",
      data: "_id",
      render: (batch) => <button onClick={()=>handleEdit(batch)} className="btn btn-sm btn-primary">Edit</button>,
    },
  ];

  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
  };
  const handleEdit =(e)=>{
    // const dataGet = {file:e.profile,...e}
    navigate(`/batch/${e._id}`)
    
    }

  return (
    <div className="">
      <BatchComponent
        title="Batch Overview"
        apiUrl={apiUrl}
        config={config}
        onClickRow={handleRowSelect}
        buttonProp={{
          onClick: () => navigate("/batch/create"),
          title: "Category",
        }}
      />
    </div>
  );
};

export default Category;
