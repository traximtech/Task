/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export interface Task {
  _id: string;
  name: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: string | { _id: string; name: string };
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

  // const handleEdit = async () => {
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${task._id}`,
  //       {
  //         title: task.title,
  //         description: task.description,
  //         status: task.status,
  //         assignedTo: task.assignedTo,
  //       }
  //     );
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  

  return (
    <div className="bg-white p-4 shadow-md rounded-xl border border-gray-200 w-full mx-auto">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
      <p className="py-4">
        Status:{" "}
        <span
          className={`py-1 text-xs px-2 rounded-full font-semibold uppercase ${getStatusClasses(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </p>

      <p className="mt-1 text-xs text-black-600">
        Assigned to:{" "}
        <span className="font-semibold">
          {task.assignedTo && typeof task.assignedTo === "object"
            ? task.assignedTo.name
            : task.assignedTo}
        </span>{" "}
      </p>

      <div className="flex gap-2 mt-4 justify-end">
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
  );
};

export default TaskCard;
