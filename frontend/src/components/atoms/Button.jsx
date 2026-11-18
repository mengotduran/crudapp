import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? 'Please wait...' : children}
    </button>
  );
}
