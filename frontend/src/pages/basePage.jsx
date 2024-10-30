import { logout } from '../utils/auth.js';
import './basePage.css';
import { useNavigate } from 'react-router-dom';

export default function BasePage({
  setIsAuthenticated,
  isAuthenticated,
  children,
}) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout(setIsAuthenticated);
    navigate('/login');
  }

  return (
    <div className="base-page">
      <header className="header">
        <h1>My D&D Assistant</h1>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <li>
              <a href="/">➤ Home</a>
            </li>
          </ul>
          {isAuthenticated && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </aside>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
