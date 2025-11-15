import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/documents', label: 'Documents' },
  { to: '/tools', label: 'Tools' },
  { to: '/blog', label: 'Blog' },
  { to: '/profile', label: 'Profile' }
];

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-semibold text-policing-blue">
          UniWork Manager
        </NavLink>
        <nav className="flex items-center gap-4 text-sm font-medium">
          {user &&
            navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-2 py-1 ${isActive ? 'text-policing-blue' : 'text-slate-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className="px-2 py-1 text-rose-600">
              Admin
            </NavLink>
          )}
          {user ? (
            <button
              onClick={logout}
              className="rounded bg-policing-blue px-3 py-1 text-white transition hover:bg-policing-sky"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="rounded border border-policing-blue px-3 py-1 text-policing-blue">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
