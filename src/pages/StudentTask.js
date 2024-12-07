// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate, useParams } from "react-router-dom";

const StudentTask = () => {
  const apiUrl = "task/TaskSubmitStudent"; // Replace with your actual API URL
const navigate = useNavigate();
const {id}= useParams();
  const config = [
    {
      colname: "Student Name",
      sortable: true,
      className: "",
      data: "student_name",
    //   render: (batch) => <p>{batch.id}</p>,
    },
    {
      colname: "Email",
      sortable: true,
      className: "",
      data: "student_email",
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
        <span className={batch.status === "0" ? "badge badge-success" : "badge badge-error"}>{batch.status ==="0" ?"Submitted":"Validated"}</span>
      ),
    },
    {
      colname: "Action",
      sortable: true,
      className: "",
      data: "_id",
      render: (batch) => <button onClick={()=>handleEdit(batch)} className="btn btn-sm btn-primary">Review</button>,
    },
  ];
  const handleEdit =(e)=>{
    console.log(e,'dwd')
    // const dataGet = {file:e.profile,...e}
    navigate(`/reviewTask/${e.assessment_id}/${e.student_id}`)
    
    }
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent title="Assessment view" useQuery={{
        assessment_id:id
      }} apiUrl={apiUrl} config={config} create={false} buttonProp={
        {
            onClick:()=> navigate('/student/create'),
            title:"Student"
        }
      }/>
    </div>
  );
};

export default StudentTask;
