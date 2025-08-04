import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: { name: string; _id: string } | string;
  createdAt: Date;
}

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/task/getTask/${id}`
        );
        setTask(res.data);
      } catch (error) {
        
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data?.message || "Something went wrong";
        toast.error(message);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div className="mt-10 px-10">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="border px-2 py-1 rounded-full mb-5 text-sm font-bold"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Tasks
          </Link>
        </div>
        <div>
          <h3 className="text-3xl font-bold mt-4 ">Task Details</h3>
          <hr className="w-25 h-1 rounded-full bg-black mb-10 ml-1 mt-1 " />
        </div>
      </div>
      {task ? (
        <>
          <div className="border border-gray-200 rounded h-100 overflow-y-auto space-y-3">
            <h2 className="text-3xl font-medium border-b p-4">{task.title}</h2>
            <p className="px-4 pb-2">{task.description}</p>
          </div>
          <div className="mt-4 font-medium">
            Status: <span className="capitalize">{task.status}</span>
          </div>
          <div>
            Assigned to:{" "}
            {task.assignedTo && typeof task.assignedTo === "object"
              ? task.assignedTo.name
              : task.assignedTo}
          </div>
          <div>
            <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        </>
      ) : (
        <p><Loader /></p>
      )}
    </div>
  );
};

export default TaskDetails;
