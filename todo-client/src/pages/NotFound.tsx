import { NavLink } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-red-600 ">This page not found</p>
        <NavLink
          to="/"
          className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded mt-4"
        >
          <i className="fa-solid fa-arrow-left pr-2"></i> Main page
        </NavLink>
    </div>
  );
};

export default NotFound;
