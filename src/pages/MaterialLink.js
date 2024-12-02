import React, { useRef } from "react";
import BatchComponent from "../components/ListTable";
import { useNavigate } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import useApi from "../components/useApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const MaterialLink = () => {
  const apiUrl = "materialLink/list";
  const navigate = useNavigate();
  const requestApi = useApi();
  const data = useSelector((state) => state.login?.user);
  const tableRef = useRef();

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
      render: (batch) => (
        <a
          className="cursor-pointer"
          target="_blank"
          href={process.env.REACT_APP_IMAGE + batch.filelink}
        >
          <FaRegFileAlt size={24} color="#31ABEB" />
        </a>
      ),
    },
    {
      colname: "Action",
      sortable: true,
      className: "",
      data: "_id",
      render: (batch) => (
        <button
          onClick={() => handleEdit(batch)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  const handleEdit = async (e) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this material link? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await requestApi.request(
        "delete",
        "materialLink/delete/" + e._id
      );
      if (response.status) {
        Swal.fire(
          "Deleted!",
          "Material link has been deleted successfully.",
          "success"
        );
        toast.success(response.message);
        handleRefresh()
      } else {
        Swal.fire("Error!", response.message, "error");
        toast.error(response.message);
      }
    }
  };
  const handleRowSelect = (data) => {
    console.log("Selected Row Data:", data);
    // Add your logic for handling row clicks
  };
  const handleRefresh = () => {
    console.log(tableRef.current)
    if (tableRef.current) {
      tableRef.current.useRefresh();
    }
  };
  return (
    <div className="">
      <BatchComponent
        title="Material Link"
        apiUrl={apiUrl}
        ref={tableRef}
        config={
          data.isAdmin == 1
          ? config
          : config.filter((e) => e.colname != "Action")
        }
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
