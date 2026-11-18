import { useCallback, useEffect, useMemo, useState } from 'react';
import { taskApi } from '../api/taskApi';
import AppTemplate from '../components/templates/AppTemplate';
import StatusSummary from '../components/organisms/StatusSummary';
import TaskTable from '../components/organisms/TaskTable';
import ConfirmDialog from '../components/organisms/ConfirmDialog';
import SearchField from '../components/molecules/SearchField';
import EmptyState from '../components/molecules/EmptyState';
import Alert from '../components/molecules/Alert';
import Button from '../components/atoms/Button';
import Spinner from '../components/atoms/Spinner';
import './TasksPage.css';

const byDueDate = (a, b) => {
  if (!a.dueDate) return b.dueDate ? 1 : 0;
  if (!b.dueDate) return -1;
  return new Date(a.dueDate) - new Date(b.dueDate);
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [togglingId, setTogglingId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    taskApi
      .list()
      .then(({ tasks }) => setTasks(tasks))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks
      .filter((task) => !status || task.status === status)
      .filter((task) => !query || task.title.toLowerCase().includes(query))
      .sort(byDueDate);
  }, [tasks, search, status]);

  const replaceTask = (updated) =>
    setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));

  const handleToggle = async (task) => {
    setTogglingId(task.id);
    setError('');
    try {
      const { task: updated } = await taskApi.update(task.id, {
        status: task.status === 'DONE' ? 'TODO' : 'DONE',
      });
      replaceTask(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

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

  const emptyState = tasks.length ? (
    <EmptyState title="No matching tasks" description="Try a different search or status." />
  ) : (
    <EmptyState
      title="No tasks yet"
      description="Create your first task to get started."
      action={<Button to="/tasks/new">New task</Button>}
    />
  );

  return (
    <AppTemplate eyebrow="Workspace" title="My tasks" actions={<Button to="/tasks/new">New task</Button>}>
      {loading ? (
        <div className="tasks-page__loading">
          <Spinner />
        </div>
      ) : (
        <div className="tasks-page">
          <StatusSummary tasks={tasks} active={status} onChange={setStatus} />
          <SearchField value={search} onChange={setSearch} />
          <Alert>{error}</Alert>
          <TaskTable
            tasks={visibleTasks}
            total={tasks.length}
            togglingId={togglingId}
            onToggle={handleToggle}
            onDelete={setTaskToDelete}
            empty={emptyState}
          />
        </div>
      )}

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
