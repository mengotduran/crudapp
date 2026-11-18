import { useCallback, useEffect, useState } from 'react';
import { taskApi } from '../api/taskApi';
import AppTemplate from '../components/templates/AppTemplate';
import TaskList from '../components/organisms/TaskList';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import TaskFilters from '../components/molecules/TaskFilters';
import EmptyState from '../components/molecules/EmptyState';
import Alert from '../components/molecules/Alert';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';
import './TasksPage.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      taskApi
        .list({ status, search: search.trim() })
        .then(({ tasks }) => active && setTasks(tasks))
        .catch((err) => active && setError(err.message))
        .finally(() => active && setLoading(false));
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [search, status]);

  const closeDialog = useCallback(() => setTaskToDelete(null), []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskApi.remove(taskToDelete.id);
      setTasks((current) => current.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filtering = Boolean(search || status);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="tasks-page__loading">
          <Spinner />
        </div>
      );
    }
    if (!tasks.length) {
      return filtering ? (
        <EmptyState title="No matching tasks" description="Try a different search or status." />
      ) : (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started."
          action={<Button to="/tasks/new">New task</Button>}
        />
      );
    }
    return <TaskList tasks={tasks} onDelete={setTaskToDelete} />;
  };

  return (
    <AppTemplate
      title="My tasks"
      subtitle={loading ? 'Loading...' : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
      actions={<Button to="/tasks/new">New task</Button>}
    >
      <div className="tasks-page">
        <TaskFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
        <Alert>{error}</Alert>
        {renderContent()}
      </div>

      <ConfirmDialog
        open={Boolean(taskToDelete)}
        title="Delete task?"
        message={`"${taskToDelete?.title}" will be permanently removed.`}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={closeDialog}
      />
    </AppTemplate>
  );
}
