import { useState } from 'react';
import FormField from '../molecules/FormField';
import Alert from '../molecules/Alert';
import Button from '../atoms/Button';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../constants/task';
import './TaskForm.css';

const emptyTask = { title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '' };

const toFormValues = (task) =>
  task
    ? {
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
      }
    : emptyTask;

export default function TaskForm({ task, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => toFormValues(task));
  const [titleError, setTitleError] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!values.title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');
    setSubmitting(true);
    try {
      await onSubmit({ ...values, dueDate: values.dueDate || null });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <Alert>{error}</Alert>
      <FormField
        id="title"
        label="Title"
        placeholder="What needs to be done?"
        value={values.title}
        onChange={handleChange}
        error={titleError}
        maxLength={120}
      />
      <FormField
        id="description"
        as="textarea"
        label="Description"
        placeholder="Add some details (optional)"
        value={values.description}
        onChange={handleChange}
      />
      <div className="task-form__row">
        <FormField
          id="status"
          as="select"
          label="Status"
          options={STATUS_OPTIONS}
          value={values.status}
          onChange={handleChange}
        />
        <FormField
          id="priority"
          as="select"
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={values.priority}
          onChange={handleChange}
        />
        <FormField
          id="dueDate"
          type="date"
          label="Due date"
          value={values.dueDate}
          onChange={handleChange}
        />
      </div>
      <div className="task-form__actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
