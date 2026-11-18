import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/tasks" className="navbar__brand">
          Taskboard
        </Link>
        <div className="navbar__user">
          <div className="navbar__profile">
            <Avatar name={user?.name} />
            <span className="navbar__name">{user?.name}</span>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
