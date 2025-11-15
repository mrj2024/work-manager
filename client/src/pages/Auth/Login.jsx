import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Navbar from '../../components/Navbar.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto mt-12 max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-800">Welcome back</h2>
        <p className="text-sm text-slate-500">Sign in to manage your coursework and tools</p>
        {error && <p className="mt-4 rounded bg-rose-100 p-3 text-sm text-rose-700">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full rounded bg-policing-blue py-2 font-semibold text-white">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Need an account?{' '}
          <Link to="/register" className="font-semibold text-policing-blue">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
