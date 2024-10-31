import SideElement from '../components/aside/sideElement.jsx';
import { logout } from '../utils/auth.js';
import './basePage.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BasePage({
  setIsAuthenticated,
  isAuthenticated,
  children,
  ...props
}) {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await logout(setIsAuthenticated);
    navigate('/');
  }

  console.log('asdfs', location.pathname);

  return (
    <div className="base-page">
      <header className="header">
        <h1>My D&D Assistant</h1>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <SideElement
              path="/"
              text="Home"
              isActive={location.pathname === '/'}
            />
            <SideElement
              path="*"
              text="Not Found"
              isActive={location.pathname === '/*'}
            />
            <SideElement
              path="/notebooks"
              text="Notebooks"
              isActive={location.pathname === '/notebooks'}
            />
          </ul>
          {isAuthenticated && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </aside>
        <div className="content">
          <h1 className="pageTitle">{props.title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
