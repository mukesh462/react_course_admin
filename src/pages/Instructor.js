// Course.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const Instructor = () => {
  const apiUrl = "instructor/list"; // Replace with your actual API URL
const navigate = useNavigate();
  const config = [
    {
      colname: "Name",
      sortable: true,
      className: "",
      data: "name",
    },
    {
      colname: "Role name",
      sortable: true,
      className: "",
      data: "role",
      render: (batch) => <p className="badge badge-warning">{batch.role}</p>,
    },
    {
      colname: "image",
      sortable: false,
      className: "",
      data: "image",
      render: (batch) =>  <img className="w-10 h-10 rounded-full" src={batch.profile !=null ? process.env.REACT_APP_IMAGE + batch.profile :"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"}/>,
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
    // Add your logic for handling row clicks
  };
const handleEdit =(e)=>{
// const dataGet = {file:e.profile,...e}
navigate(`/instructor/${e._id}`)

}
  return (
    <div className="">
      
      <BatchComponent title="Instructor" apiUrl={apiUrl} config={config} onClickRow={handleRowSelect} buttonProp={
        {
            onClick:()=> navigate('/instructor/create'),
            title:"instructor"
        }
      }/>
    </div>
  );
};

export default Instructor;
