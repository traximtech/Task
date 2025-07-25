import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/login");
  };
  return (
    <header className="bg-white shadow sticky top-0 px-15">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-black-600">✓</span>
          <Link to={"/"}>
            <span className="text-xl font-semibold">Todo App</span>
          </Link>
        </div>
        <div>
          <div className="flex items-center gap-2">
            {user ? (
              <button onClick={logout} className="cursor-pointer">
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
