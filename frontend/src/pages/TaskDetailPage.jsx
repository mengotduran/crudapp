import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskApi } from '../api/taskApi';
import { useTask } from '../hooks/useTask';
import { formatDate } from '../constants/task';
import AppTemplate from '../components/templates/AppTemplate';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import { PriorityLabel, StatusBadge } from '../components/molecules/StatusBadge';
import Alert from '../components/molecules/Alert';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';
import Text from '../components/atoms/Text';
import './TasksPage.css';

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, loading, error } = useTask(id);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const closeDialog = useCallback(() => setConfirming(false), []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskApi.remove(id);
      navigate('/tasks');
    } catch (err) {
      setDeleteError(err.message);
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <AppTemplate
      eyebrow="Task details"
      title={task ? task.title : 'Task'}
      back={<Link to="/tasks">Back to tasks</Link>}
      narrow
      actions={
        task && (
          <>
            <Button variant="ghost-danger" onClick={() => setConfirming(true)}>
              Delete
            </Button>
            <Button to={`/tasks/${id}/edit`}>Edit</Button>
          </>
        )
      }
    >
      {loading && <Spinner />}
      <Alert>{error || deleteError}</Alert>

      {task && (
        <section className="task-detail">
          <div className="task-detail__body">
            <p className="eyebrow">Description</p>
            {task.description ? (
              <p className="task-detail__description">{task.description}</p>
            ) : (
              <Text muted className="task-detail__description">
                No description provided.
              </Text>
            )}
          </div>
          <dl className="task-detail__meta">
            <div>
              <dt>Status</dt>
              <dd>
                <StatusBadge status={task.status} />
              </dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>
                <PriorityLabel priority={task.priority} />
              </dd>
            </div>
            <div>
              <dt>Due date</dt>
              <dd>{formatDate(task.dueDate) || 'Not set'}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{formatDate(task.createdAt, { utc: false })}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>{formatDate(task.updatedAt, { utc: false })}</dd>
            </div>
          </dl>
        </section>
      )}

      <ConfirmDialog
        open={confirming}
        title="Delete task?"
        message="This task will be permanently removed. This action cannot be undone."
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={closeDialog}
      />
    </AppTemplate>
  );
}
