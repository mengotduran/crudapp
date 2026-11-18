import Input from '../atoms/Input';
import Select from '../atoms/Select';
import { STATUS_OPTIONS } from '../../constants/task';
import './TaskFilters.css';

const filterOptions = [{ value: '', label: 'All statuses' }, ...STATUS_OPTIONS];

export default function TaskFilters({ search, status, onSearchChange, onStatusChange }) {
  return (
    <div className="task-filters">
      <Input
        type="search"
        placeholder="Search by title"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks"
      />
      <Select
        options={filterOptions}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter by status"
      />
    </div>
  );
}
