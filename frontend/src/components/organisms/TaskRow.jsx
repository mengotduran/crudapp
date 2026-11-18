import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Checkbox from '../atoms/Checkbox';
import { PriorityLabel, StatusBadge } from '../molecules/StatusBadge';
import { formatDate } from '../../constants/task';

export default function TaskRow({ task, toggling, onToggle, onDelete }) {
  const done = task.status === 'DONE';

  return (
    <div className={`task-row ${done ? 'task-row--done' : ''}`}>
      <Checkbox
        checked={done}
        label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        onChange={() => onToggle(task)}
        disabled={toggling}
      />
      <div className="task-row__main">
        <Link to={`/tasks/${task.id}`} className="task-row__title">
          {task.title}
        </Link>
        {task.description && <p className="task-row__description">{task.description}</p>}
      </div>
      <div className="task-row__meta">
        <span className="task-row__status">
          <StatusBadge status={task.status} />
        </span>
        <PriorityLabel priority={task.priority} />
        <span className="task-row__due">{formatDate(task.dueDate) || 'No due date'}</span>
        <div className="task-row__actions">
          <Button variant="ghost" size="sm" to={`/tasks/${task.id}/edit`}>
            Edit
          </Button>
          <Button variant="ghost-danger" size="sm" onClick={() => onDelete(task)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
