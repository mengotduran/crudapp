export const STATUS_META = {
  TODO: { label: 'To do', tone: 'neutral' },
  IN_PROGRESS: { label: 'In progress', tone: 'info' },
  DONE: { label: 'Done', tone: 'success' },
};

export const PRIORITY_META = {
  LOW: { label: 'Low', tone: 'neutral' },
  MEDIUM: { label: 'Medium', tone: 'warning' },
  HIGH: { label: 'High', tone: 'danger' },
};

const toOptions = (meta) =>
  Object.entries(meta).map(([value, { label }]) => ({ value, label }));

export const STATUS_OPTIONS = toOptions(STATUS_META);
export const PRIORITY_OPTIONS = toOptions(PRIORITY_META);

const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };

export const formatDate = (value, { utc = true } = {}) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        ...dateFormat,
        ...(utc && { timeZone: 'UTC' }),
      })
    : null;
