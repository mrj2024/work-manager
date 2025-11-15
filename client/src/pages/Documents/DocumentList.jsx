import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import UploadModal from '../../components/UploadModal.jsx';
import api from '../../utils/api.js';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadDocuments = async () => {
    const { data } = await api.get('/documents');
    setDocuments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const createDocument = async () => {
    try {
      const { data } = await api.post('/documents', { title: `Untitled ${Date.now()}`, content: '<p></p>' });
      navigate(`/documents/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create document');
    }
  };

  const deleteDocument = async (id) => {
    await api.delete(`/documents/${id}`);
    loadDocuments();
  };

  const handleUpload = async (formData) => {
    try {
      await api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setShowModal(false);
      loadDocuments();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Documents</h1>
          <p className="text-sm text-slate-500">Create rich documents or upload .docx/.pdf/.txt files.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowModal(true)} className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Upload
          </button>
          <button onClick={createDocument} className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
            New Document
          </button>
        </div>
      </div>
      {error && <p className="mt-4 rounded bg-rose-100 p-3 text-sm text-rose-600">{error}</p>}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          documents.map((doc) => (
            <div key={doc._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800">{doc.title}</h3>
              <p className="text-xs text-slate-500">Updated {new Date(doc.updatedAt).toLocaleString()}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link to={`/documents/${doc._id}`} className="text-sm font-semibold text-policing-blue">
                  Edit
                </Link>
                <button onClick={() => deleteDocument(doc._id)} className="text-sm text-rose-500">
                  Delete
                </button>
                <a
                  href={`/api/documents/${doc._id}/export?format=pdf`}
                  className="text-sm text-slate-500 underline"
                  rel="noreferrer"
                >
                  PDF
                </a>
                <a href={`/api/documents/${doc._id}/export?format=docx`} className="text-sm text-slate-500 underline">
                  DOCX
                </a>
                <a href={`/api/documents/${doc._id}/export?format=md`} className="text-sm text-slate-500 underline">
                  Markdown
                </a>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && <UploadModal onClose={() => setShowModal(false)} onSubmit={handleUpload} />}
    </DashboardLayout>
  );
};

export default DocumentList;
