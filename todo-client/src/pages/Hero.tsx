import { useEffect, useState } from "react";
import TaskCard, { type Task } from "../components/TaskCard";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";

const Hero = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "todo" | "in-progress" | "done"
  >("all");

  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/task/getTasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return loading ? (
    <Loader text="Loading the data.." />
  ) : (
    <>
      <h1 className="text-3xl font-bold mt-10">
        Tasks Board <i className="fa-solid fa-xs fa-list-check"></i>
      </h1>
      <hr className="w-25 h-1 rounded-full bg-black mb-10 ml-1 mt-1" />
      <div className="flex justify-end gap-4 pr-20 mb-6">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            filterStatus === "all" ? "bg-black text-white" : "bg-black/10"
          }`}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setFilterStatus("todo")}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            filterStatus === "todo" ? "bg-black text-white" : "bg-black/10"
          }`}
        >
          Todo ({tasks.filter((task) => task.status === "todo").length})
        </button>
        <button
          onClick={() => setFilterStatus("in-progress")}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            filterStatus === "in-progress"
              ? "bg-black text-white"
              : "bg-black/10"
          }`}
        >
          In-progress (
          {tasks.filter((task) => task.status === "in-progress").length})
        </button>
        <button
          onClick={() => setFilterStatus("done")}
          className={`px-4 py-2 rounded-full cursor-pointer ${
            filterStatus === "done" ? "bg-black text-white" : "bg-black/10"
          }`}
        >
          Completed ({tasks.filter((task) => task.status === "done").length})
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 pr-20 pb-10">
        {filteredTasks.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">No tasks found</p>
        )}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
          />
        ))}
      </div>
    </>
  );
};

export default Hero;
