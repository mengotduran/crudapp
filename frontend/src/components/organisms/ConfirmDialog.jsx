import { useEffect } from 'react';
import Button from '../atoms/Button';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import './ConfirmDialog.css';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="dialog-title">
          <Heading level={2}>{title}</Heading>
        </div>
        <Text muted>{message}</Text>
        <div className="dialog__actions">
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} autoFocus>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
