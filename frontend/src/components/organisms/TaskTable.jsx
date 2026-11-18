import TaskRow from './TaskRow';
import './TaskTable.css';

export default function TaskTable({ tasks, total, togglingId, onToggle, onDelete, empty }) {
  return (
    <section className="task-table">
      <div className="task-table__head" aria-hidden="true">
        <span />
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Due</span>
        <span className="task-table__head-actions">Actions</span>
      </div>

      {tasks.length
        ? tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              toggling={togglingId === task.id}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        : empty}

      <div className="task-table__footer">
        <span>
          Showing {tasks.length} of {total} {total === 1 ? 'task' : 'tasks'}
        </span>
        <span>Sorted by due date</span>
      </div>
    </section>
  );
}
