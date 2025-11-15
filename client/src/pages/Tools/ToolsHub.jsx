import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import EvidenceTable from '../../components/EvidenceTable.jsx';
import api from '../../utils/api.js';

const ToolsHub = () => {
  const [paceCodes, setPaceCodes] = useState([]);
  const [crimeData, setCrimeData] = useState([]);
  const [ndm, setNdm] = useState([]);
  const [legislation, setLegislation] = useState([]);
  const [legislationQuery, setLegislationQuery] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [evidenceForm, setEvidenceForm] = useState({
    itemName: '',
    time: '',
    officer: '',
    location: '',
    signature: ''
  });

  const loadInitial = async () => {
    const [{ data: pace }, { data: crime }, { data: ndmData }, { data: legis }, { data: evidenceResp }] = await Promise.all([
      api.get('/tools/pace'),
      api.get('/tools/crime-classification'),
      api.get('/tools/ndm'),
      api.get('/tools/legislation'),
      api.get('/tools/evidence')
    ]);
    setPaceCodes(pace);
    setCrimeData(crime);
    setNdm(ndmData);
    setLegislation(legis);
    setEvidence(evidenceResp.entries || []);
  };

  useEffect(() => {
    loadInitial();
  }, []);

  const filterPace = async (letter = '', search = '') => {
    const { data } = await api.get('/tools/pace', { params: { letter, search } });
    setPaceCodes(data);
  };

  const searchLegislation = async (e) => {
    e.preventDefault();
    const { data } = await api.get('/tools/legislation', { params: { search: legislationQuery } });
    setLegislation(data);
  };

  const addEvidence = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/tools/evidence', evidenceForm);
    setEvidence(data.entries);
    setEvidenceForm({ itemName: '', time: '', officer: '', location: '', signature: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Policing Degree Tools</h1>
          <p className="text-sm text-slate-500">
            PACE lookup, crime classification, National Decision Model, evidence continuity tracker, and legislation index.
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">PACE Codes Lookup</h2>
            <div className="flex gap-2">
              {'ABCDEFGH'.split('').map((letter) => (
                <button
                  key={letter}
                  onClick={() => filterPace(letter)}
                  className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-policing-blue/10 hover:text-policing-blue"
                >
                  {letter}
                </button>
              ))}
              <button onClick={() => filterPace()} className="rounded border border-slate-200 px-2 py-1 text-xs">
                Clear
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {paceCodes.map((code) => (
              <article key={code.title} className="rounded border border-slate-200 p-4">
                <h3 className="font-semibold text-policing-blue">{code.title}</h3>
                <p className="text-sm text-slate-600">{code.summary}</p>
                <ul className="mt-2 list-disc pl-4 text-sm text-slate-500">
                  {code.keyPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
            {!paceCodes.length && <p className="text-sm text-slate-500">No codes match the filter.</p>}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">Crime Classification</h2>
            <p className="text-sm text-slate-500">Summary, either-way, and indictable sample offences.</p>
            <div className="mt-4 space-y-3">
              {crimeData.map((item) => (
                <div key={item.offence} className="rounded border border-slate-200 p-4">
                  <p className="font-semibold text-slate-800">{item.offence}</p>
                  <p className="text-xs uppercase tracking-wide text-policing-blue">{item.classification}</p>
                  <p className="text-sm text-slate-500">{item.notes}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">National Decision Model</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {ndm.map((stage) => (
                <div key={stage.id} className="rounded border border-policing-blue/20 p-4 hover:bg-policing-blue/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-policing-blue">Stage {stage.id}</p>
                  <h3 className="text-lg font-semibold text-slate-800">{stage.title}</h3>
                  <p className="text-sm text-slate-500">{stage.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Legislation Reference</h2>
              <p className="text-sm text-slate-500">Quick summaries of frequently cited acts.</p>
            </div>
            <form onSubmit={searchLegislation} className="flex gap-2">
              <input
                value={legislationQuery}
                onChange={(e) => setLegislationQuery(e.target.value)}
                placeholder="Search acts"
                className="rounded border border-slate-300 px-3 py-2 text-sm"
              />
              <button className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">Search</button>
            </form>
          </div>
          <div className="mt-4 space-y-4">
            {legislation.map((item) => (
              <div key={item.act} className="rounded border border-slate-200 p-4">
                <h3 className="text-lg font-semibold text-policing-blue">{item.act}</h3>
                <p className="text-sm text-slate-600">{item.summary}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">Key sections</p>
                <ul className="list-disc pl-4 text-sm text-slate-500">
                  {item.keySections.map((section) => (
                    <li key={section}>{section}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">Evidence Continuity Tracker</h2>
            <form onSubmit={addEvidence} className="mt-4 grid gap-4">
              {Object.keys(evidenceForm).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.replace(/([A-Z])/g, ' $1')}
                  className="rounded border border-slate-300 px-3 py-2 text-sm"
                  value={evidenceForm[key]}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, [key]: e.target.value })}
                  required
                />
              ))}
              <button type="submit" className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
                Log Item
              </button>
            </form>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">Logged Entries</h2>
            <div className="mt-4">
              <EvidenceTable entries={evidence} />
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ToolsHub;
