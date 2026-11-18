import { useEffect, useState } from 'react';
import { taskApi } from '../api/taskApi';

export function useTask(id) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    taskApi
      .get(id)
      .then(({ task }) => active && setTask(task))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  return { task, loading, error };
}
