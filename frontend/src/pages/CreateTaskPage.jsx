import { Link, useNavigate } from 'react-router-dom';
import { taskApi } from '../api/taskApi';
import AppTemplate from '../components/templates/AppTemplate';
import TaskForm from '../components/organisms/TaskForm';
import './FormPage.css';

export default function CreateTaskPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await taskApi.create(values);
    navigate('/tasks');
  };

  return (
    <AppTemplate
      title="New task"
      subtitle="Fill in the details below."
      back={<Link to="/tasks">Back to tasks</Link>}
      narrow
    >
      <div className="form-page">
        <TaskForm submitLabel="Create task" onSubmit={handleSubmit} onCancel={() => navigate('/tasks')} />
      </div>
    </AppTemplate>
  );
}
