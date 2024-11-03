// Student.jsx or any other parent component
import React from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";
import MyClassCard from "../components/MyClassCard";

const MyClass = () => {
  const apiUrl = "myclass/list"; // Replace with your actual API URL
  const navigate = useNavigate();
  const formatDatetime = (dateString,type) => {
    if(type == 'date'){

      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
  
      return `${day}-${month}-${year}`;
    }
    else{
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${hours}:${minutes}`;
    }
  };

  const config = [
    // {
    //   colname: "ID",
    //   sortable: true,
    //   className: "",
    //   data: "_id",
    //   //   render: (batch) => <p>{batch.id}</p>,
    // },
    {
      colname: "Topic Name",
      sortable: true,
      className: "",
      data: "topic_name",
    },
    {
      colname: "Date",
      sortable: true,
      className: "",
      render: (rowData) => {
        const dateString = rowData.date; // Assuming rowData contains the date
        return <p className="badge">{formatDatetime(dateString,'date')}</p>;
      },
    },
    {
      colname: "Start Time",
      sortable: true,
      className: "",
      render: (rowData) => {
        const dateString = rowData.start_time;
        return <p className="badge">{formatDatetime(dateString,'time')}</p>;
      },
    },
    {
      colname: "End Time",
      sortable: true,
      className: "",
      render: (rowData) => {
        const dateString = rowData.end_time;
        return <p className="badge">{formatDatetime(dateString,'time')}</p>;
      },
    },
    {
      colname: "Action",
      sortable: true,
      className: "",
      render: (batch) => (
        <button className="btn bg-orange-500 text-white btn-sm" value={batch._id}>Edit</button>
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
        title="My Class"
        apiUrl={apiUrl}
        config={config}
        onClickRow={handleRowSelect}
        buttonProp={{
          onClick: () => navigate("/class/create"),
          title: "MyClass",
        }}
      />
      {/* <MyClassCard/> */}
    </div>
  );
};

export default MyClass;
