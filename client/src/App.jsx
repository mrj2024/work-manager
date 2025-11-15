import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ProfileSettings from './pages/Dashboard/ProfileSettings.jsx';
import DocumentList from './pages/Documents/DocumentList.jsx';
import DocumentEditor from './pages/Documents/DocumentEditor.jsx';
import BlogList from './pages/Blog/BlogList.jsx';
import BlogPost from './pages/Blog/BlogPost.jsx';
import BlogAdminEditor from './pages/Blog/BlogAdminEditor.jsx';
import ToolsHub from './pages/Tools/ToolsHub.jsx';
import AdminPanel from './pages/Admin/AdminPanel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/documents/:id" element={<DocumentEditor />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/tools" element={<ToolsHub />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Route>

      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/blog" element={<BlogAdminEditor />} />
      </Route>
    </Routes>
  );
};

export default App;
