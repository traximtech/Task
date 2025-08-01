import { NavLink, Outlet } from "react-router-dom";



const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 bg-black/10 h-screen shadow-xl fixed">
        <ul className="flex flex-col gap-2 font-medium uppercase pt-20 px-2">
          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              `p-4 rounded cursor-pointer flex items-center ${
                isActive ? "bg-black text-white" : "text-black hover:bg-black/5"
              }`
            }
          >
            <i className="fa-solid fa-cart-plus pr-4"></i> Add Task
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-4 rounded cursor-pointer flex items-center ${
                isActive ? "bg-black text-white" : "text-black hover:bg-black/5"
              }`
            }
          >
            <i className="fa-solid fa-list-check pr-4"></i> Task
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) =>
              `p-4 rounded cursor-pointer flex items-center ${
                isActive ? "bg-black text-white" : "text-black hover:bg-black/5"
              }`
            }
          >
            <i className="fa-solid fa-chart-line pr-4"></i> Activities
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `p-4 rounded cursor-pointer flex items-center ${
                isActive ? "bg-black text-white" : "text-black hover:bg-black/5"
              }`
            }
          >
            <i className="fa-solid fa-bars-progress pr-4"></i> Progress
          </NavLink>
        </ul>
      </div>

      {/* Main Container */}
      <div className="ml-[20%] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
