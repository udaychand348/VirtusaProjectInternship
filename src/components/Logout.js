import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    };

    handleLogout();
  }, [setToken, navigate]);

  return null;
};

export default Logout;
