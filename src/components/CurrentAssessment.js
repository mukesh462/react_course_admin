import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import imgBanner from "../assets/bannerCourse.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useApi from "./useApi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function CurrentAssessment() {
  const isLoggedIn = useSelector((state) => state.login.user);
  const { request } = useApi();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const viewQuestion = (id) => {
    navigate("/assessment/" + id);
  };
  const formatDatetime = (dateString, type) => {
    const date = new Date(dateString);
    if (type === "date") {
      return `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;
    } else {
      return moment(dateString).format("hh:mm a");
    }
  };
  useEffect(() => {
    const setAssessment = async () => {
      const response = await request("post", "task/getTask", {
        user_id: isLoggedIn?._id,
      });
      if (response.status) {
        console.log(response.data, "res");
        setData(response.data);
      } else {
        toast.error(response.message);
      }
    };
    setAssessment();
  }, []);
  const Card = ({ data }) => (
    <div className="relative flex flex-col md:flex-row  my-2 bg-white shadow-sm border border-slate-200 rounded-lg max-w-2xl">
      <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
        <img
          src={imgBanner}
          alt="card-image"
          className="h-full w-full rounded-md md:rounded-lg object-cover"
        />
      </div>
      <div className="p-6">
        <h4 className="mb-2 text-slate-800 text-xl font-semibold">
          {data?.title}
        </h4>
        <p className="mb-8 text-slate-600 leading-normal font-light">
          <div className="flex gap-2 justify-start items-center">
            <div className="font-bold">Issue Date :</div>
            <div className="font-normal">
              {" "}
              {formatDatetime(data?.start_time, "date") +
                "  " +
                formatDatetime(data?.start_time, "time")}
            </div>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <div className="font-bold">Due Date :</div>
            <div className="font-normal">
              {" "}
              {formatDatetime(data?.end_date, "date") +
                "  " +
                formatDatetime(data?.end_time, "time")}
            </div>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <div className="font-bold">Status :</div>
            <div className="rounded-full bg-teal-600 py-0.5 px-2.5 mt-1 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
              {data?.submission_status == 0 ? "Open" : "Submitted"}
            </div>
          </div>
        </p>
        <div>
          {
            data?.submission_status == 0 && (
               <button
            onClick={() => viewQuestion(data?._id)}
            className="flex justify-center items-center text-center bg-[#31ABEB] w-full text-white p-2 rounded-md font-semibold text-sm hover:underline gap-2"
          >
            Take Assessment <FaArrowRightLong />
          </button>
            )
          }
         
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex justify-center items-center flex-col my-5">
        {data.length > 0 ? (
          data.map((q) => <Card data={q} />)
        ) : (
          <div className="font-medium text-[#31ABEB] my-5">
            No record Available{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentAssessment;
