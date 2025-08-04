import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Task } from "./TaskCard";

interface User {
  _id: string;
  name: string;
}

interface EditTaskModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchTasks: () => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const TaskModel = ({
  open,
  setOpen,
  fetchTasks,
  editingTask,
  setEditingTask,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch users for assign Task
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
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setAssignedTo(
        typeof editingTask.assignedTo === "object"
          ? editingTask.assignedTo._id
          : editingTask.assignedTo
      );
    }
  }, [editingTask]);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask?._id) {
      toast.error("Task ID is missing");
      return;
    }

    setLoading(true);

    try {
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
      fetchTasks();
      setOpen(false);
      setEditingTask(null);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !editingTask) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={() => {
            setOpen(false);
            setEditingTask(null);
          }}
        >
          ✖
        </button>

        <div className="text-center text-2xl font-semibold mb-4">Edit Task</div>
        <hr className="border-amber-600 mb-4" />

        <form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 w-full h-10 rounded-xl bg-amber-100/40 p-2"
          />
          <textarea
            rows={5}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-xl bg-amber-100/40 p-2"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border border-gray-300 rounded-xl bg-amber-100/40 p-2"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="border border-gray-300 rounded-xl bg-amber-100/40 p-2"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              disabled={loading}
              className="bg-amber-600 text-white px-4 py-2 rounded-xl"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-xl"
              onClick={(e) => {
                e.preventDefault();
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
