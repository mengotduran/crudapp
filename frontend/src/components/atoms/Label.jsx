import './Field.css';

export default function Label({ children, ...props }) {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
}
