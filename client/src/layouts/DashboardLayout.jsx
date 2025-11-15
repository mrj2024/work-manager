import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import useAuth from '../hooks/useAuth.js';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const extraLinks = user?.role === 'admin' ? [{ to: '/admin', label: 'Admin Panel' }] : [];
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
        <Sidebar extraLinks={extraLinks} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
