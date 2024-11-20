// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const apiUrl = "category/list"; 
  const navigate = useNavigate();
  const config = [
    
    {
      colname: "Category name",
      sortable: true,
      className: "capitalize ",
      data: "category_name",
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
      sortable: true,
      className: "",
      data: "_id",
      render: (batch) => <button onClick={()=>handleEdit(batch)} className="btn btn-sm btn-primary">Edit</button>,
    },
  ];
  const handleEdit =(e)=>{
    // const dataGet = {file:e.profile,...e}
    navigate(`/category/${e._id}`)
    
    }
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };

  return (
    <div className="">
      <BatchComponent
        title="Category Overview"
        apiUrl={apiUrl}
        config={config}
        onClickRow={handleRowSelect}
        buttonProp={{
          onClick: () => navigate("/category/create"),
          title: "Category",
        }}
      />
    </div>
  );
};

export default Category;
