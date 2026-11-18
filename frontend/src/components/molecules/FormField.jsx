import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';
import './FormField.css';

const controls = { input: Input, textarea: Textarea, select: Select };

export default function FormField({ id, label, error, as = 'input', ...props }) {
  const Control = controls[as];
  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>
      <Control id={id} name={id} invalid={Boolean(error)} {...props} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
