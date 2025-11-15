import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/documents', label: 'Documents' },
  { to: '/tools', label: 'Policing Tools' },
  { to: '/blog', label: 'Blog Feed' },
  { to: '/profile', label: 'Profile' }
];

const Sidebar = ({ extraLinks = [] }) => {
  return (
    <aside className="hidden w-60 flex-shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Navigation</p>
        <nav className="space-y-2">
          {[...links, ...extraLinks].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-policing-blue/10 text-policing-blue' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
