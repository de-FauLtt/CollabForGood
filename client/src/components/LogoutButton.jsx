import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token and user role from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');

    // 2. Redirect the user to the login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
