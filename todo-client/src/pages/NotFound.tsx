import { NavLink } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-black-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 ">This page is under construction</p>
        <NavLink
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Main page
        </NavLink>
    </div>
  );
};

export default NotFound;
