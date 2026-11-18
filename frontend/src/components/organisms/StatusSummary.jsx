import StatCard from '../molecules/StatCard';
import { STATUS_OPTIONS } from '../../constants/task';
import './StatusSummary.css';

const filters = [{ value: '', label: 'All tasks' }, ...STATUS_OPTIONS];

export default function StatusSummary({ tasks, active, onChange }) {
  const countFor = (status) =>
    status ? tasks.filter((task) => task.status === status).length : tasks.length;

  return (
    <div className="status-summary">
      {filters.map((filter) => (
        <StatCard
          key={filter.value || 'all'}
          label={filter.label}
          count={countFor(filter.value)}
          active={active === filter.value}
          onClick={() => onChange(filter.value)}
        />
      ))}
    </div>
  );
}
