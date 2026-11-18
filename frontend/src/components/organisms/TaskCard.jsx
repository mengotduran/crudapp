import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { PriorityBadge, StatusBadge } from '../molecules/StatusBadge';
import { formatDate } from '../../constants/task';
import './TaskCard.css';

export default function TaskCard({ task, onDelete }) {
  return (
    <article className={`task-card ${task.status === 'DONE' ? 'task-card--done' : ''}`}>
      <div className="task-card__body">
        <Link to={`/tasks/${task.id}`} className="task-card__title">
          {task.title}
        </Link>
        {task.description && <p className="task-card__description">{task.description}</p>}
        <div className="task-card__meta">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          {task.dueDate && <span className="task-card__due">Due {formatDate(task.dueDate)}</span>}
        </div>
      </div>
      <div className="task-card__actions">
        <Button variant="ghost" size="sm" to={`/tasks/${task.id}/edit`}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="task-card__delete" onClick={() => onDelete(task)}>
          Delete
        </Button>
      </div>
    </article>
  );
}
