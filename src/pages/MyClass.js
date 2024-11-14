import React, { useEffect, useState } from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";
import MyClassCard from "../components/MyClassCard";
import useApi from "../components/useApi";
import toast from "react-hot-toast";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const MyClass = () => {
  const apiUrl = "myclass/list";
  const navigate = useNavigate();
  const [classList, setClassList] = useState([]);
  const { request } = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toggle, settoggle] = useState(true);
  const itemsPerPage = 1; // Number of cards to display at a time

  const formatDatetime = (dateString, type) => {
    const date = new Date(dateString);
    if (type === "date") {
      return `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;
    } else {
      return `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}`;
    }
  };

  const config = [
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
      render: (rowData) => (
        <p className="badge">{formatDatetime(rowData.date, "date")}</p>
      ),
    },
    {
      colname: "Start Time",
      sortable: true,
      className: "",
      render: (rowData) => (
        <p className="badge">{formatDatetime(rowData.start_time, "time")}</p>
      ),
    },
    {
      colname: "End Time",
      sortable: true,
      className: "",
      render: (rowData) => (
        <p className="badge">{formatDatetime(rowData.end_time, "time")}</p>
      ),
    },
    {
      colname: "Action",
      sortable: true,
      className: "",
      render: (batch) => (
        <button
          className="btn bg-orange-500 text-white btn-sm"
          onClick={() => handleEdit(batch)}
        >
          Edit
        </button>
      ),
    },
  ];

  const handleEdit = (e) => {
    navigate(`/class/${e._id}`);
  };

  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
  };

  useEffect(() => {
    const setClass = async () => {
      const response = await request("post", "myclass/myclasses", {
        user_id: "67245999e2d1bc940c6c037a",
      });
      if (response.status) {
        setClassList(response.data);
      } else {
        toast.error(response.message);
      }
    };
    setClass();
  }, []);

  const handleNext = () => {
    if (currentIndex < classList.length - itemsPerPage) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  return (
    <div>
      <button className="bg-indigo-500 text-white p-2 rounded-lg " onClick={()=> settoggle(!toggle)}>Toggle</button>
      {toggle ? (
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
      ) : (
        <div className="">
          {classList.length > 1 && (
            <div className="flex gap-2 justify-end mb-4">
              <button
                onClick={handlePrevious}
                className="p-2 bg-[#31abeb] text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
              >
                <IoIosArrowDropleft size={25} />
              </button>

              <button
                onClick={handleNext}
                className="p-2 bg-[#31abeb] text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={currentIndex >= classList.length - itemsPerPage}
              >
                <IoIosArrowDropright size={25} />
              </button>
            </div>
          )}

          <div className="flex gap-4 overflow-hidden justify-center">
            {classList
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, index) => (
                <MyClassCard key={item._id || index} data={item} />
              ))}
            {classList.length === 0 && <div>No Classes For you Today</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;
