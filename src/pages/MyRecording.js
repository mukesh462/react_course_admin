import { useState } from "react";
import Modal from "../components/Model.js";
import VideoCard  from "../components/VideoCard";



export default function MyRecording() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addSrc, setaddSrc] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const videos = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      thumbnail: "https://placehold.co/400",
      duration: "15:30",
      views: 10500,
      date: "2023-05-15",
      src: "https://www.youtube.com/watch?v=J8vW57-ALts", // Original video link
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Tailwind CSS",
      thumbnail: "https://placehold.co/400",
      duration: "22:45",
      views: 8200,
      date: "2023-05-20",
      src: "https://www.youtube.com/watch?v=J0gA6N7-s10", // Original video link
    },
    {
      id: 3,
      title: "Next.js 13 App Router Deep Dive",
      thumbnail: "https://placehold.co/400",
      duration: "31:20",
      views: 15700,
      date: "2023-05-25",
      src: "https://www.youtube.com/watch?v=dy9yH2U1MDo", // Original video link
    },
    {
      id: 4,
      title: "State Management in React with Zustand",
      thumbnail: "https://placehold.co/400",
      duration: "18:15",
      views: 6300,
      date: "2023-05-30",
      src: "https://www.youtube.com/watch?v=7OcvXGIs2-k", // Original video link
    },
    {
      id: 5,
      title: "Creating Custom Hooks in React",
      thumbnail: "https://placehold.co/400",
      duration: "20:10",
      views: 9100,
      date: "2023-06-04",
      src: "https://www.youtube.com/watch?v=6Zz1bTZmg-4", // Original video link
    },
    {
      id: 6,
      title: "Optimizing React Performance",
      thumbnail: "https://placehold.co/400",
      duration: "27:55",
      views: 12400,
      date: "2023-06-09",
      src: "https://www.youtube.com/watch?v=Jc9U_E4w6bo", // Original video link
    },
  ];
  const handleClick = (e) => {
    openModal()
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          Trending{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Tech Talks
          </span>
        </h1>
        <Modal isOpen={isModalOpen} closeModal={closeModal} title="Modal Title">
          <p>This is a reusable modal component.</p>
        </Modal>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
              views={video.views}
              onClick={(e) => handleClick(e)}
              date={video.date}
              author={video.author}
              src={video.src}
            />
          ))}
        </div>

       
      </div>
    </div>
  );
}
