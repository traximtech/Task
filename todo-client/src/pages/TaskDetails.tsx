import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Task {
    _id: string;
    title: string;
    description: string;
}

const TaskDetails = () => {
  const id = useParams().id; // Get the task ID from the URL parameter
  const [task, setTask] = useState <Task | null>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/task/getTask/${id}`
        );
        setTask(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div>
      {task && (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          {/* Add more task details here */}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;