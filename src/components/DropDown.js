import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { GoPerson } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';

function Example() {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton className={"me-10"}>
        <GoPerson className='border border-gray-800 text-4xl p-1 m-0 rounded-full hover:bg-gray-200 transition duration-150' />
      </MenuButton>
      <MenuItems anchor="bottom " className="bg-white shadow-lg rounded-md ">
        <MenuItem>
          <Link
            className="block px-4 py-2 text-gray-700  transition duration-150 rounded-md"
           to={'/MyProfile'}
          >
            Profile
          </Link>
        </MenuItem>
       
        <MenuItem>
          <a
            className="block px-4 py-2 text-gray-700  transition duration-150 rounded-md"
            href="/license"
          >
            Logout
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default Example;
