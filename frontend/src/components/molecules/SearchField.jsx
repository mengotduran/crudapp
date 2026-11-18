import Input from '../atoms/Input';

export default function SearchField({ value, onChange }) {
  return (
    <div>
      <label htmlFor="task-search" className="visually-hidden">
        Search tasks by title
      </label>
      <Input
        id="task-search"
        type="search"
        placeholder="Search by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
