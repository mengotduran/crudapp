import { Link } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/organisms/LoginForm';

export default function LoginPage() {
  return (
    <AuthTemplate
      eyebrow="Log in"
      title="Welcome back"
      subtitle="Log in to manage your tasks."
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </>
      }
    >
      <LoginForm />
    </AuthTemplate>
  );
}
