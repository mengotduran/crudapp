import TaskCard from './TaskCard';
import './TaskList.css';

export default function TaskList({ tasks, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
