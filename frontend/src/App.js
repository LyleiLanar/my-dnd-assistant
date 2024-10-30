import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Home from './pages/home.jsx';
import { useEffect, useState } from 'react';
import { checkAuthStatus } from './utils/auth.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchAuthStatus() {
      const status = await checkAuthStatus();

      setIsAuthenticated(status);
    }
    fetchAuthStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
