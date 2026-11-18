import './Typography.css';

export default function Text({ muted = false, size = 'md', children, className = '' }) {
  return (
    <p className={`text text--${size} ${muted ? 'text--muted' : ''} ${className}`}>{children}</p>
  );
}
