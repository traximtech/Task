import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Task } from "./TaskCard";

interface TaskModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchTasks: () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

interface User {
  _id: string;
  name: string;
}

const TaskModel = ({
  open,
  setOpen,
  fetchTasks,
  editingTask,
  setEditingTask,
}: TaskModelProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/users`
      );
      setUsers(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setAssignedTo(
        typeof editingTask.assignedTo === "object"
          ? editingTask.assignedTo._id
          : editingTask.assignedTo || ""
      );
    } else {
      setTitle("");
      setDescription("");
      setAssignedTo("");
    }
  }, [editingTask]);

  if (!open) return null;

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        // Edit mode
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${
            editingTask._id
          }`,
          {
            title,
            description,
            status,
            assignedTo,
          }
        );
        toast.success("Task updated successfully");
      } else {
        // Create mode
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/task/add`, {
          title,
          description,
        });
        toast.success("Task created successfully");
      }

      fetchTasks();
      setOpen(false);
      setEditingTask(null);
      setTitle("");
      setDescription("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => setOpen(false)}
        >
          ✖
        </button>
        <div className="text-center text-2xl font-semibold mb-4">
          {editingTask ? "Edit Task" : "Create Task"}
        </div>
        <hr className="border-amber-600 mb-4" />
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Task Title"
            className="border border-gray-300 w-full h-10 rounded-xl bg-amber-100/40 p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={5}
            placeholder="Your Task Description"
            className="border border-gray-300 rounded-xl bg-amber-100/40 p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-xl bg-amber-100/40 p-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user: User) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          {editingTask && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 text-xs "
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          )}
          <div className="flex justify-between mt-4">
            <button
              disabled={loading}
              className="bg-amber-600 text-white px-4 py-2 rounded-xl"
            >
              {loading
                ? editingTask
                  ? "Updating..."
                  : "Creating..."
                : editingTask
                ? "Update"
                : "Create"}
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-xl"
              onClick={() => {
                setOpen(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModel;
