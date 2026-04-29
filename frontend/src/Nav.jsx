import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './api';

export default function Nav() {
  const isAdmin = useAuth();
  const nav = useNavigate();

  if (isAdmin === null) return <p>Loading...</p>;

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL || '/02_module_b'}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    nav('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/02_module_b/verify">Verify GTIN</Link> |
      {isAdmin
        ? <><Link to="/02_module_b/products">Admin Products</Link> | <Link to="/02_module_b/companies">Admin Companies</Link> | <button onClick={logout}>Logout</button></>
        : <Link to="/02_module_b/login">Admin Login</Link>}
    </nav>
  );
}
