import { useEffect, useState } from "react";
import { type Task } from "../components/TaskCard";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";
import SortableTaskCard from "../components/SortableTaskCard";
import DroppableColumn from "../components/DroppableColumn";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type TaskStatus = "todo" | "in-progress" | "done";

const Hero = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // const sensors = useSensors(useSensor(PointerSensor));

  const tasksByStatus: Record<TaskStatus, Task[]> = {
    todo: [],
    "in-progress": [],
    done: [],
  };

  tasks.forEach((task) => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    }
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    if (!["todo", "in-progress", "done"].includes(newStatus)) return;

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update task");
      setTasks(tasks);
    }
  };

  return loading ? (
    <Loader text="Data Loading..." />
  ) : (
    <>
      <h1 className="text-3xl font-bold mt-10">
        Tasks Board <i className="fa-solid fa-xs fa-list-check"></i>
      </h1>
      <hr className="w-25 h-1 rounded-full bg-black mb-10 ml-1 mt-1" />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6 pr-10 pb-10">
          {(["todo", "in-progress", "done"] as TaskStatus[]).map((status) => (
            <DroppableColumn key={status} id={status}>
              <SortableContext
                items={tasksByStatus[status].map((task) => task._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="bg-gray-100 rounded-md p-4 min-h-[480px]">
                  <h2 className="font-semibold text-xl capitalize mb-3 pb-2 border-b-2">
                    {status}
                  </h2>
                  {tasksByStatus[status].map((task) => (
                    <SortableTaskCard
                      key={task._id}
                      task={task}
                      fetchTasks={fetchTasks}
                    />
                  ))}
                  {tasksByStatus[status].length === 0 && (
                    <p className="text-center text-gray-400">
                      Not available task for this status
                    </p>
                  )}
                </div>
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default Hero;
