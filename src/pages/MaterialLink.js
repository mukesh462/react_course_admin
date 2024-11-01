// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";

const MaterialLink = () => {
  const apiUrl = "materialLink/list"; 
  const navigate = useNavigate();
  const config = [
    
    {
      colname: "Material name",
      sortable: true,
      className: "capitalize ",
      data: "name",
    },
    {
        colname: "File",
        sortable: false,
        className: "",
        data: "filelink",
        render: (batch) => <a className="cursor-pointer" target="_blank" href={process.env.REACT_APP_IMAGE + batch.filelink}><FaRegFileAlt size={24} color="#31ABEB" /></a>,
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
    navigate(`/materialLink/${e._id}`)
    
    }
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent
        title="Material Link"
        apiUrl={apiUrl}
        config={config}
        onClickRow={handleRowSelect}
        buttonProp={{
          onClick: () => navigate("/materialLink/create"),
          title: "Material",
        }}
      />
    </div>
  );
};

export default MaterialLink;
