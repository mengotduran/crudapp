import './Field.css';

export default function Input({ invalid, className = '', ...props }) {
  return (
    <input
      className={`control ${invalid ? 'control--invalid' : ''} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
