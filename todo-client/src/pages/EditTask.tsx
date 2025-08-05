import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Task } from "../components/TaskCard";
import Button, { BackButton } from "../components/Button";

interface User {
  _id: string;
  name: string;
}

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/users`
        );
        setUsers(res.data);
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/task/getTask/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const task: Task = res.data;

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setAssignedTo(
          typeof task.assignedTo === "object"
            ? task.assignedTo._id
            : task.assignedTo
        );
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Failed to fetch task");
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return toast.error("Task ID is missing");

    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${id}`,
        {
          title,
          description,
          status,
          assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Task updated successfully");
      navigate("/");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-10 w-4/5 mx-auto">
      <BackButton onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-rotate-left mr-2"></i>
        Back to Tasks
      </BackButton>
      <h1 className="text-2xl font-bold mb-1 uppercase">Edit Task</h1>
      <hr className="w-20 h-[3px] rounded-full  bg-black mb-5" />
      <div className="">
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium underline">Title</label>
            <input
              type="text"
              value={title}
              className="border-b-2 border-gray-500 text-[#4f4f4f] rounded-t-1xl outline-0 w-full h-12 bg-gray-50 p-2"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium underline mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              className="border-b-2 border-gray-500 text-[#4f4f4f] rounded-t-1xl outline-0 w-full h-40 bg-gray-50 p-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label className="block font-medium underline">Assigned To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="border-b-2 border-gray-500 text-[#4f4f4f] rounded-t-1xl outline-0 w-full h-12 bg-gray-50 p-2"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block font-medium underline">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="border-b-2 border-gray-500 text-[#4f4f4f] rounded-t-1xl outline-0 w-full h-12 bg-gray-50 p-2"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <Button
              disabled={loading || !title || !description.trim() || !assignedTo}
            >
              {loading ? (
                <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
