// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const apiUrl = "student/list"; // Replace with your actual API URL
const navigate = useNavigate();
  const config = [
    {
      colname: "Student Name",
      sortable: true,
      className: "",
      data: "name",
    //   render: (batch) => <p>{batch.id}</p>,
    },
    {
      colname: "Batch Name",
      sortable: true,
      className: "",
      data: "batch_name",
    },
    {
      colname: "Email",
      sortable: true,
      className: "",
      data: "email",
    //   render: (batch) => <p className="badge">{batch.price}</p>,
    },
    {
      colname: "Phone",
      sortable: true,
      className: "",
      data: "phone_number",
    //   render: (batch) => <p className="badge">{batch.price}</p>,
    },
    {
      colname: "profile",
      sortable: true,
      className: "",
      data: "profile",
      render: (batch) =>  <img className="w-10 h-10 rounded-full" src={batch.profile !=null ? process.env.REACT_APP_IMAGE + batch.profile :"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"}/>,
    },
    {
      colname: "Status",
      sortable: true,
      className: "capitalize",
      data: "status",
      render: (batch) => (
        <span className={batch.status === "1" ? "badge badge-success" : "badge badge-error"}>{batch.status ==="1" ?"Active":"In Active"}</span>
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
  const handleEdit =(e)=>{
    // const dataGet = {file:e.profile,...e}
    navigate(`/student/${e._id}`)
    
    }
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent title="Student" apiUrl={apiUrl} config={config} onClickRow={handleRowSelect} buttonProp={
        {
            onClick:()=> navigate('/student/create'),
            title:"Student"
        }
      }/>
    </div>
  );
};

export default Student;
