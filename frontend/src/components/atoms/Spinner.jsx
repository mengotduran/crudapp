import './Spinner.css';

export default function Spinner({ fullscreen = false }) {
  const spinner = <span className="spinner" role="status" aria-label="Loading" />;
  return fullscreen ? <div className="spinner-screen">{spinner}</div> : spinner;
}
