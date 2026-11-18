import Badge from '../atoms/Badge';
import { PRIORITY_META, STATUS_META } from '../../constants/task';
import './StatusBadge.css';

export function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}

export function PriorityLabel({ priority }) {
  return (
    <span className="priority">
      <span className={`priority__dot priority__dot--${priority.toLowerCase()}`} />
      {PRIORITY_META[priority].label}
    </span>
  );
}
