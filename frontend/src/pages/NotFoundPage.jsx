import AuthTemplate from '../components/templates/AuthTemplate';
import Button from '../components/atoms/Button';

export default function NotFoundPage() {
  return (
    <AuthTemplate eyebrow="Error 404" title="Page not found" subtitle="The page you are looking for does not exist.">
      <Button to="/" fullWidth>
        Go home
      </Button>
    </AuthTemplate>
  );
}
