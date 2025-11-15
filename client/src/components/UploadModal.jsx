import { useState } from 'react';

const UploadModal = ({ onClose, onSubmit }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800">Upload a Document</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="file"
            accept=".docx,.pdf,.txt"
            className="w-full rounded border border-slate-300"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded border px-4 py-2 text-slate-700">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white hover:bg-policing-sky"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
