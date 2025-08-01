/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

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
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, fetchTasks, onEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/task/deleteTask/${task._id}`
      );

      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
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
    <div className="bg-white  shadow-md rounded-xl w-full mx-auto relative">
      <p className="text-sm text-gray-400 absolute top-4 right-4">
        Assign to:{" "}
        <span className="font-semibold text-black">
          {task.assignedTo && typeof task.assignedTo === "object"
            ? task.assignedTo.name
            : task.assignedTo}
        </span>{" "}
      </p>
      <div className="bg-[#e5e5e5] p-4 border-b-2 ">
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </div>
      <div className="p-4">
        <p className=" mt-2 text-sm w-80  line-clamp-2 ">
          {task.description}
        </p>
        <p className="py-3 text-sm">
          Status:{" "}
          <span
            className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase ${getStatusClasses(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </p>

        <div className="text-xs">
          <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 mt-4 justify-between">
          <div className="px-6 py-1 rounded-full bg-blue-400 hover:bg-blue-200 text-[10px] font-semibold">
            <NavLink to={`/task/${task._id}`}>See Details</NavLink>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1.5">
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 rounded-full text-[10px] bg-blue-400 text-white hover:bg-blue-200"
              >
                🖊
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded-full bg-red-400 text-[10px] text-white hover:bg-red-200"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
