import Badge from '../atoms/Badge';
import { PRIORITY_META, STATUS_META } from '../../constants/task';

export function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}

export function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority];
  return <Badge tone={meta.tone}>{meta.label} priority</Badge>;
}
