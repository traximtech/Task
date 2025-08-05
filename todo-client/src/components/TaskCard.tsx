
import axios, { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export interface Task {
  _id: string;
  name: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: string | { _id: string; name: string };
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  fetchTasks: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, fetchTasks,  }) => {
 
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/task/deleteTask/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-yellow-100 text-black";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white  shadow-md rounded-xl w-full h-52 mx-auto relative">
      <Link to={`/edit/${task._id}`}>
        <p className="text-sm text-gray-400 absolute top-4 right-4">
          Assign to:{" "}
          <span className="font-semibold text-black">
            {task.assignedTo && typeof task.assignedTo === "object"
              ? task.assignedTo.name
              : "No One"}
          </span>{" "}
        </p>
        <div className="bg-[#e5e5e5] p-4 border-b-2 ">
          <h3 className="text-lg font-semibold">{task.title}</h3>
        </div>
        <div className="p-4">
          <p className="text-sm w-80  line-clamp-2 ">
            {task.description}
          </p>

          <div className="text-xs mt-4 -mb-3 font-medium">
            <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-row gap-2 items-center justify-between px-4 pb-2 ">
        <div>
          
          <p className="py-3 text-sm font-medium">
            Status:{" "}
            <span
              className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase ${getStatusClasses(
                task.status
              )}`}
              >
              {task.status}
            </span>
          </p>
              </div>
          <div className="">
            <button
              onClick={handleDelete}
              className="px-3 py-1 rounded-full bg-red-400 text-[10px] text-white hover:bg-red-200"
            >
              ❌
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default TaskCard;
