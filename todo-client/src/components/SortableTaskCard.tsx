import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard, { type Task } from "./TaskCard";

interface Props {
  task: Task;
  fetchTasks: () => void;
  className?: string;
}

const SortableTaskCard = ({ task, fetchTasks }: Props) => {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: task._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "manipulation",
    marginBottom: "1rem",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} fetchTasks={fetchTasks} />
    </div>
  );
};

export default SortableTaskCard;
