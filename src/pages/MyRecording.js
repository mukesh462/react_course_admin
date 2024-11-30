import { useEffect, useState } from "react";
import Modal from "../components/Model.js";
import VideoCard from "../components/VideoCard";
import useApi from "../components/useApi.js";
import toast from "react-hot-toast";
import moment from "moment/moment.js";
import VideoPlayer from "../components/Videoplayer.jsx";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

export default function MyRecording() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addSrc, setaddSrc] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(1); // Limit to 10 items per page
  const [totalCount, setTotalCount] = useState(0); // Total number of records
  const { request } = useApi();
  const isLoggedIn = useSelector((state) => state.login.user);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request("post", "myclass/myrecords", {
        user_id: isLoggedIn?._id,
        page: currentPage + 1, // API expects 1-based page index
        limit: itemsPerPage,
      });
      if (response.status) {
        setData(response.data); // Assuming API response has a "records" key
        setTotalCount(response.data.totalCount); // Assuming API provides "totalCount"
      } else {
        toast.error(response.message);
      }
    };
    fetchData();
  }, [currentPage]); // Re-fetch data when page changes

  const handleClick = (video) => {
    openModal();
    setaddSrc(video);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="min-h-screen py-5 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Recording
          </span>
        </h1>

        {addSrc ? (
          <div>
            <div className="">
              <button
                className="bg-gray-400 text-white p-2 rounded-lg"
                onClick={() => setaddSrc(null)}
              >
                Back
              </button>
            </div>
            <div className="flex justify-center items-center">
              <VideoPlayer
                src={addSrc?.recordingUrl}
                poster="https://placehold.co/400"
              />
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="p-5 rounded-lg bg-white font-bold text-[#31ABEB] text-center">
            No Record found
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((video) => (
                <VideoCard
                  key={video._id}
                  title={video?.topic_name}
                  thumbnail={video.thumbnail}
                  duration={"1:00:00"}
                  views={video.views}
                  onClick={() => handleClick(video)}
                  date={moment(video.date).format("DD/MM/YYYY")}
                  author={video.author}
                  src={video?.recordingUrl}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={Math.ceil(totalCount / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                className="flex space-x-2"
                pageClassName="px-3 py-2 rounded-lg border"
                pageLinkClassName="hover:bg-gray-200"
                previousClassName="px-3 py-2 rounded-lg bg-gray-400 text-white"
                nextClassName="px-3 py-2 rounded-lg bg-gray-400 text-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
