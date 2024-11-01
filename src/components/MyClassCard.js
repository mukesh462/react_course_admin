import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaBook,
    FaStar,
    FaArrowRight,
    FaFileAlt,
  } from "react-icons/fa";
  import { IoAddCircleOutline } from "react-icons/io5";
  
  export default function MyClassCard() {
    return (
      <div className="">
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 bg-[#31abeb] text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Advanced React Techniques
                </h1>
                <p className="text-base sm:text-lg mb-6 opacity-90">
                  Elevate your React skills with our comprehensive advanced
                  course.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="h-5 w-5 sm:h-6 sm:w-6 mr-3 opacity-75" />
                    <span className="text-sm sm:text-base">
                      Monday, Oct 16, 2023
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="h-5 w-5 sm:h-6 sm:w-6 mr-3 opacity-75" />
                    <span className="text-sm sm:text-base">
                      10:00 AM - 12:00 PM
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6 mr-3 opacity-75" />
                    <span className="text-sm sm:text-base">
                      Virtual Classroom
                    </span>
                  </div>
                </div>
                <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    Pre-read Materials
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="flex items-center text-sm sm:text-base hover:underline"
                      >
                        <FaFileAlt className="mr-2 h-4 w-4" />
                        React Hooks Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center text-sm sm:text-base hover:underline"
                      >
                        <FaFileAlt className="mr-2 h-4 w-4" />
                        Context API Deep Dive
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center text-sm sm:text-base hover:underline"
                      >
                        <FaFileAlt className="mr-2 h-4 w-4" />
                        Performance Optimization Techniques
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Instructor"
                    className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-4 object-cover border-4 border-[#31abeb]"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                      Jane Doe
                    </h2>
                    <p className="text-[#31abeb]">Senior React Developer</p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="h-5 w-5 text-[#31abeb]" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm sm:text-base">
                      (4.9/5 from 120 reviews)
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                  Dive deep into advanced React concepts including hooks, context
                  API, and performance optimization techniques. This course will
                  help you build scalable and efficient React applications that
                  can handle real-world challenges.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-[#31abeb] hover:bg-[#2c9ad4] text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base">
                    <IoAddCircleOutline className="h-5 w-5 mr-2" />
                    Join Now
                  </button>
                  <button className="w-full bg-transparent hover:bg-gray-100 text-[#31abeb] font-semibold py-3 px-4 border border-[#31abeb] rounded-lg transition duration-300 text-sm sm:text-base">
                    Download Syllabus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  