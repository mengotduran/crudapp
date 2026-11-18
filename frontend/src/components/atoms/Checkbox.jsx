import './Checkbox.css';

export default function Checkbox({ checked, label, onChange, disabled }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={`checkbox ${checked ? 'checkbox--checked' : ''}`}
      onClick={onChange}
      disabled={disabled}
    />
  );
}
