import React from 'react';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon
import ThemeToggle from './ThemeToggle';
import Example from './DropDown';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
const nav = useNavigate();

  return (
    <header className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md w-full min-w-full">
      <div className="px-6 py-2 flex justify-between items-center">
        {/* Hamburger Icon for Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-900 dark:text-white focus:outline-none md:hidden"
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold cursor-pointer" onClick={()=> nav('/')}>GrowTogether</h1>
        <div>
        {/* <ThemeToggle /> */}
        <Example/>
          {/* <button className="px-4 py-2 rounded-md bg-blue-500 text-white">Log Out</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
