/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        { email, password }
      );

      const { token, message } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", res.data.user);

      toast.success(message);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-6  border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold mb-3">Login</h1>
            <p className="font-light">Enter Your Credentials to access.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Your Secret"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-3 font-medium rounded cursor-pointer hover:bg-primary/90 transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="">
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <span className="text-blue-600 font-medium">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
