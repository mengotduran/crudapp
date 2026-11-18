import { Link } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import RegisterForm from '../components/organisms/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthTemplate
      title="Create an account"
      subtitle="Start organizing your work in minutes."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <RegisterForm />
    </AuthTemplate>
  );
}
