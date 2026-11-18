import './StatCard.css';

export default function StatCard({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      className={`stat-card ${active ? 'stat-card--active' : ''}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__count">{count}</span>
    </button>
  );
}
