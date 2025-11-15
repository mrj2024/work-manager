import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <Navbar />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center">
        <p className="rounded-full bg-policing-blue/10 px-4 py-1 text-sm font-semibold text-policing-blue">
          University Work Manager & Policing Tools Portal
        </p>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Manage assignments, collaborate, and access policing degree resources in one secure portal.
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Upload coursework, edit rich documents, download formatted files, review published blogs, and use tools built for
          policing degree students. Manual admin approvals ensure a trusted community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="rounded bg-policing-blue px-6 py-3 font-semibold text-white">
            Get Started
          </Link>
          <Link to="/login" className="rounded border border-policing-blue px-6 py-3 font-semibold text-policing-blue">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
