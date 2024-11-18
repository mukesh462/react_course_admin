import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/LoginSlice";

function Example() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutFunction = () => {
    dispatch(logout());
    navigate("/login");
  };
  const data = useSelector((state) => state.login?.user);
  const BaseUrl  = process.env.REACT_APP_IMAGE;

  return (
    <Menu>
      <MenuButton className={"me-10"}>
        {data ? (
          <img className="h-10 rounded-full" src={BaseUrl+data.profile}></img>
        ) : (
          <GoPerson className="border border-gray-800 text-4xl p-1 m-0 rounded-full hover:bg-gray-200 transition duration-150" />
        )}
      </MenuButton>
      <MenuItems anchor="bottom " className="bg-white shadow-lg rounded-md ">
        <MenuItem>
          <Link
            className="block px-4 py-2 text-gray-700  transition duration-150 rounded-md"
            to={"/MyProfile"}
          >
            Profile
          </Link>
        </MenuItem>

        <MenuItem onClick={logoutFunction} className="cursor-pointer">
          <a className="block px-4 py-2 text-gray-700  transition duration-150 rounded-md">
            Logout
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default Example;
