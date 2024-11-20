// Course.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const apiUrl = "course/list"; // Replace with your actual API URL
const navigate = useNavigate();
  const config = [
    {
      colname: "Course Name",
      sortable: true,
      className: "",
      data: "course_name",
    //   render: (batch) => <p>{batch.id}</p>,
    },
    {
      colname: "Category",
      sortable: true,
      className: "",
      data: "category_name",
    },
    {
      colname: "Sub Category",
      sortable: true,
      className: "",
      data: "subcategory_name",
    //   render: (batch) => <p className="badge">{batch.price}</p>,
    },
   
    {
      colname: "Status",
      sortable: true,
      className: "capitalize",
      data: "status",
      render: (batch) => (
        <span className={batch.status === '1' ? "badge badge-success" : "badge badge-error"}>{batch.status === '1' ?"Active":"In Active"}</span>
      ),
    },
    {
      colname: "Action",
      sortable: false,
      className: "",
      data: "_id",
      render: (batch) => <button onClick={()=>handleEdit(batch)} className="btn btn-sm btn-primary">Edit</button>,
    },
  ];
  const handleEdit =(e)=>{
    // const dataGet = {file:e.profile,...e}
    navigate(`/course/${e._id}`)
    
    }
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent title="Course" apiUrl={apiUrl} config={config} onClickRow={handleRowSelect} buttonProp={
        {
            onClick:()=> navigate('/course/create'),
            title:"course"
        }
      }/>
    </div>
  );
};

export default Course;
