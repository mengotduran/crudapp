import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../molecules/FormField';
import Alert from '../molecules/Alert';
import Button from '../atoms/Button';
import './AuthForm.css';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(values);
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
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" fullWidth loading={submitting}>
        Log in
      </Button>
    </form>
  );
}
