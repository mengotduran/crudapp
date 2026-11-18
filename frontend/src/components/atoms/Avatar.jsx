import './Avatar.css';

const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export default function Avatar({ name }) {
  return (
    <span className="avatar" aria-hidden="true">
      {initialsOf(name)}
    </span>
  );
}
