import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../molecules/FormField';
import Alert from '../molecules/Alert';
import Button from '../atoms/Button';
import './AuthForm.css';

const validate = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
  if (password.length < 6) errors.password = 'Use at least 6 characters';
  if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match';
  return errors;
};

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    setError('');
    if (Object.keys(fieldErrors).length) return;

    setSubmitting(true);
    try {
      const { name, email, password } = values;
      await register({ name, email, password });
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Alert>{error}</Alert>
      <FormField
        id="name"
        label="Full name"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <FormField
        id="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <Button type="submit" fullWidth loading={submitting}>
        Create account
      </Button>
    </form>
  );
}
