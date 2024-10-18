import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import { LiaBattleNet } from "react-icons/lia";
import { useNavigate } from "react-router-dom"; // Import the hook
import { PiStudent } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { GoDuplicate } from "react-icons/go";
import { SlBookOpen } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

const SidebarComponent = ({ collapsed }) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Sidebar
      collapsedWidth="60px"
      collapsed={collapsed}
      className="h-full transition-width duration-300 dark:bg-black bg-white"
    >
      <Menu iconShape="square" rootStyles={{}} menuItemStyles={{}}>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<FaGem color="#31ABEB" className="" />}
          onClick={() => navigate("/dashboard")} // Navigate to dashboard
        >
          Dashboard
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<LiaBattleNet color="#31ABEB" className="" />}
          onClick={() => navigate("/batch")}
        >
          Batch
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<PiStudent color="#31ABEB" className="" />}
          onClick={() => navigate("/student")}
        >
          Student
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<TbCategory color="#31ABEB" className="" />}
          onClick={() => navigate("/category")}
        >
          Category
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<GoDuplicate color="#31ABEB" className="" />}
          onClick={() => navigate("/subCategory")}
        >
          SubCategory
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<SlBookOpen color="#31ABEB" className="" />}
          onClick={() => navigate("/course")}
        >
          Course
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<SiGoogleclassroom color="#31ABEB" className="" />}
          onClick={() => navigate("/class")}
        >
          My Class
        </MenuItem>
        <MenuItem
          className="dark:text-white text-gray-500"
          icon={<MdOutlineAssignmentTurnedIn color="#31ABEB" className="" />}
          onClick={() => navigate("/assessment")}
        >
          My Class
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
