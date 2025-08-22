import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * A wrapper component that checks for an existing session and redirects the user
 * to their dashboard if they are already logged in.
 */
export default function AuthWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for a token and user role in local storage
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole) {
      if (userRole === 'ngo') {
        navigate('/ngo-dashboard');
      } else if (userRole === 'donor') {
        navigate('/donor-dashboard');
      }
    }
  }, [navigate]);

  return children;
}
