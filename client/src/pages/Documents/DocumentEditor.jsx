import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import RichTextEditor from '../../components/RichTextEditor.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import api from '../../utils/api.js';

const DocumentEditor = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/documents/${id}`);
      setDocument(data);
      setContent(data.content);
      setTitle(data.title);
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!document) return;
    setStatus(false);
    const timeout = setTimeout(() => {
      saveDocument();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [content]);

  const saveDocument = async () => {
    await api.put(`/documents/${id}`, { title, content });
    setStatus(true);
  };

  if (!document) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-semibold text-slate-800 outline-none"
          />
          <p className="text-xs text-slate-500">Auto-saves every few seconds</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge saved={status} />
          <button onClick={saveDocument} className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
            Save now
          </button>
        </div>
      </div>
      <div className="mt-6">
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div className="mt-4 flex gap-4">
        <a href={`/api/documents/${id}/export?format=pdf`} className="text-sm font-semibold text-policing-blue">
          Download PDF
        </a>
        <a href={`/api/documents/${id}/export?format=docx`} className="text-sm font-semibold text-policing-blue">
          Download DOCX
        </a>
        <a href={`/api/documents/${id}/export?format=md`} className="text-sm font-semibold text-policing-blue">
          Download Markdown
        </a>
      </div>
    </DashboardLayout>
  );
};

export default DocumentEditor;
