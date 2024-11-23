import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import { LiaBattleNet, LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiFileVideo, PiStudent } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { GoDuplicate } from "react-icons/go";
import { SlBookOpen } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarComponent = ({ collapsed }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.user?.isAdmin) === '1';

  const menuItems = [
    { label: "Dashboard", icon: <FaGem />, path: "/dashboard" },
    { label: "Batch", icon: <LiaBattleNet />, path: "/batch" },
    { label: "Student", icon: <PiStudent />, path: "/student" },
    { label: "Category", icon: <TbCategory />, path: "/category" },
    { label: "SubCategory", icon: <GoDuplicate />, path: "/subCategory" },
    { label: "Course", icon: <SlBookOpen />, path: "/course" },
    { label: "My Class", icon: <SiGoogleclassroom />, path: "/class" },
    { label: "Assessment", icon: <MdOutlineAssignmentTurnedIn />, path: "/assessment" },
    { label: "Material Link", icon: <GrDocumentPdf />, path: "/materialLink" },
    { label: "Instructor", icon: <LiaChalkboardTeacherSolid />, path: "/instructor" },
    { label: "My Recording", icon: <PiFileVideo />, path: "/recording" },
  ];

  const filteredItems = isLoggedIn
    ? menuItems
    : menuItems.filter(item =>
        ["My Class", "Assessment", "My Recording",'Material Link'].includes(item.label)
      );

  return (
    <Sidebar
      collapsedWidth="60px"
      collapsed={collapsed}
      className="h-full transition-width duration-300 dark:bg-black bg-white"
    >
      <Menu>
        {filteredItems.map(({ label, icon, path }) => (
          <MenuItem
            key={label}
            className="dark:text-white text-gray-500"
            icon={React.cloneElement(icon, { color: "#31ABEB" })}
            onClick={() => navigate(path)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
