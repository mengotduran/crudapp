import './Field.css';

export default function Textarea({ invalid, className = '', ...props }) {
  return (
    <textarea
      className={`control control--textarea ${invalid ? 'control--invalid' : ''} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
