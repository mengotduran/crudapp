import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import './EmptyState.css';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <Heading level={3}>{title}</Heading>
      {description && <Text muted>{description}</Text>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
