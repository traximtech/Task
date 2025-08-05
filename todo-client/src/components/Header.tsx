import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import avatar from "../assets/avatar.png";

interface User {
  _id: string;
  name: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");
  let currentUser: User | null = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      currentUser = {
        _id: payload.id,
        name: payload.name,
      };
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logout successfully");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 px-15 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="logo" className="h-10 rounded-lg" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div>
            {currentUser && (
              <p className="text-gray-700 border-e-2 pr-4">
                👋 Welcome,
                <span className="font-semibold text-black-600">
                  {" "}
                  {currentUser?.name}{" "}
                </span>
              </p>
            )}
          </div>
          <div className="relative">
            {token && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <div className="flex items-center gap-5 ">
                  <img
                    src={avatar}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <i className="fa-solid fa-caret-down"></i>
                {dropdownOpen && (
                  <div className="absolute text-center right-2 mt-32 w-30 py-2 bg-white border border-gray-300 rounded-md shadow-xl z-50">
                    <Link
                      to="/profile"
                      className="block py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-user"></i> Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full  cursor-pointer  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      <i className="fa-solid fa-outdent"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
