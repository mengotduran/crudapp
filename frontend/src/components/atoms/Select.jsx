import './Field.css';

export default function Select({ options, invalid, className = '', ...props }) {
  return (
    <select
      className={`control control--select ${invalid ? 'control--invalid' : ''} ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
