import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Home from './pages/home.jsx';
import Notebooks from './pages/notebooks.jsx';
import { useEffect, useState } from 'react';
import { checkAuthStatus } from './utils/auth.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchAuthStatus() {
      const status = await checkAuthStatus();
      console.log('setIsAuthenticated', status);
      setIsAuthenticated(status);
    }
    fetchAuthStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />
        <Route
          path="/notebooks"
          element={
            <Notebooks
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFound
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
