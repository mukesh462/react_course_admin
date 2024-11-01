// SubCategory.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";

const SubCategory = () => {
  const apiUrl = "subcategory/list"; // Replace with your actual API URL
const navigate = useNavigate();
  const config = [
    
    {
      colname: "Subcategory Name",
      sortable: true,
      className: "capitalize",
      data: "subcategory_name",
    },
     
    {
      colname: "Category Name",
      sortable: true,
      className: "capitalize",
      data: "category_name",
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
    navigate(`/subcategory/${e._id}`)
    
    }
    const handleRowSelect = (data) => {
      console.log("Selected Row Data:", data);
      // Add your logic for handling row clicks
    };
  return (
    <div className="">
      <BatchComponent title="Sub Category" apiUrl={apiUrl} config={config} onClickRow={handleRowSelect} buttonProp={
        {
            onClick:()=> navigate('/subCategory/create'),
            title:"sub Category"
        }
      }/>
    </div>
  );
};

export default SubCategory;
