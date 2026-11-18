import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskApi } from '../api/taskApi';
import { useTask } from '../hooks/useTask';
import AppTemplate from '../components/templates/AppTemplate';
import TaskForm from '../components/organisms/TaskForm';
import Alert from '../components/molecules/Alert';
import Spinner from '../components/atoms/Spinner';
import './FormPage.css';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, loading, error } = useTask(id);

  const handleSubmit = async (values) => {
    await taskApi.update(id, values);
    navigate(`/tasks/${id}`);
  };

  return (
    <AppTemplate
      eyebrow="Tasks"
      title="Edit task"
      subtitle="Update the details and save your changes."
      back={<Link to={`/tasks/${id}`}>Back to task</Link>}
      narrow
    >
      {loading && <Spinner />}
      <Alert>{error}</Alert>
      {task && (
        <div className="form-page">
          <TaskForm
            task={task}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/tasks/${id}`)}
          />
        </div>
      )}
    </AppTemplate>
  );
}
